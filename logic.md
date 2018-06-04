# OperateActive
- validTokenAndSign()
## 1、当Action为下列几项的时候不需要验证Token
    OperateActive   登录验证
    CrtActive   签名证书验证
    OperateUpdatePwd    修改密码
    OperateResetPwd     重置密码
    OperateInspection   巡检
    SendMsg     发送短信验证
    SendMail    发送邮件
    OperateTake     卡片领用
    OperateReturn   卡片归还
    ApplyActive     申请者认证
    OperateSign     签名

> 2、其他的Action的时候需要先验证Token是否为空，再验证Token是否为Disable，随后获取存储在服务端的Token entity
> 3、获取Token中的sha256Data、clientID，将上传的data+token+version解析为=和&拼接的字符串。使用Hex.sha256_HMAC()进行签名，随后与signature进行比较。  相同则验证通过
-  transfer Action 对应的java

### (1) OperateActive ------ busiHandle(String Token,String data,String uuid) ----- 检测上送的card并生成一个Identification
    将data-->ReqData对象，获取operateKeyID、managerKeyID、ClineRanA、DomainCode、ClientID、ClineRandAsgn、ClineRandB、ClineRandBsgn、time
    check filed valid

    检验时间的有效性 ===> 防止重放 =====> |now.getTime() - simpeDateFormat.parse(time).getTime| 与 60的比较 超出了该请求无效

    通过operateKeyID、manageKeyID获取有效的操作员卡对应的证书、有效的管理员卡对应的证书 --- 随后通过证书获取对应的card

    使用manageCrt中的key中的publicKey来检验ClineRandB+time与ClineRandBsgn的相关性
    使用operateCrt中的key中的publicKey来检验ClineRandA+time与ClineRandAsgn的相关性

    使用permissionCheckPojo对象对应的permissionCheckService.VerifyManageOperate()来检查管理员卡是否对操作员卡有权限
    使用permissionCheckService.VerifyCard()来检测card status是否正常，并且卡片密码是否为初始密码

    判断上送的卡片使用区域码是否存在与后台数据库中 ----- 获取DomainCode对应的CardUseDomain对象
    判断操作类型是否存在与后台数据库中 ----- 获取Operate_Active对应的CardOperateRight对象
    使用permissionBasePojo对象的permissionBaseImp.VerfiyOperate()来验证操作员卡是否有对应的区域权限、操作权限

    获取operateCard.getUseScenes(),PcClientDataDisplay.dataDisplay(useScenarios, operateCard, manageCard, dblog, uuid)处理UKey登录后密码修改时间、巡检时间对应的str

    生成Token -------- 生成服务器端的随机数ClineRandC+获取服务端的privateKey+使用Hex.byte2Hex()生成加密ServerRandCenc+生成ClineRandBencry加密数据+使用ClineRandA、ClineRandB、ClineRandC生成sha256Data+获取Token实体对象t，并将sha256Data、sha256Data.subString(32)、ClientID存储进去，随后保存到数据库中 =========> 将该Token设置到resultData中的Token对象中，并返回给客户端。

    return resultData --- status("00")


### (2) OperateInspection ------ busiHandle(String Token,String data,String uuid) ------ 就是检查operateCard的相关密码更改期限

    将data-->ReqData对象，获取operateKeyID、managerKeyID、ClineRanA、DomainCode、InspectionCode  
    check filed valid

    通过operateKeyID、manageKeyID获取有效的操作员卡对应的证书、有效的管理员卡对应的证书 --- 随后通过证书获取对应的card

    使用permissionCheckPojo对象对应的permissionCheckService.VerifyApplyOperate()来检查管理员卡是否对操作员卡有权限  
    使用permissionCheckService.VerifyCard()来检测cardtatus是否正常，并且卡片密码是否为初始密码

    根据operateCard、manageCard来获取cardRandom对象，验证CardRandom对象是否过期  
    判断InspectionCode是否与operateCard的cardRandom或者与manageCard的CardRandom相同

    判断上送的卡片使用区域码是否存在与后台数据库中-----获取DomainCode对应的CardUseDomain对象  
    判断操作类型是否存在与后台数据库中-----获取Operate_Active对应的CardOperateRight对象  
    使用permissionBasePojo对象的permissionBaseImp.VerfiyOperate()来验证操作员卡是否有对应的区域权限、操作权限

    如果CardRandom不为空，置CardRandom的status为"0" ----- 即为该CardRandom不可用 ----- status: 0 false  1 true  

    更新operateCard的inspectionTime、status  
    reutrn resultData --- status("00")

### (3) ApplyActive ------ busiHandle(String Token,String data,String uuid) ------ 
    将data-->ReqData对象，获取operateKeyID、managerKeyID、DomainCode  
    check filed valid

### (4) OperateTake ------ busiHandle(String Token,String data,String uuid) ------

    将data-->ReqData对象，获取operateKeyID、managerKeyID、Recipient、DomainCode、RecipientPhone、RecipientEmail 
    check filed valid