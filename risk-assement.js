 // 风险等级不够 弹出剩余次数提示
                // this.showRemainingNum = true
                try {
                    let { monthTimes, yearTimes } = await checkRiskAssessTimes()
                    // let monthTimes = 1,
                    //     yearTimes = 1
                    /**
                     * 一年五次  一个月三次
                     * yearTimes <= 0 
                     * 提示整年没有次数做测评了
                     * */
                    /**
                    * yearTimes >0
                    * 1 - 一个月超出三次 - 下个月再尝试
                    * 2 -  一个月没有超出三次
                    */
                    if (yearTimes <= 0) {
                        this.$confirm({
                            className: 'remaining-container',
                            message: `
                            <div class="title center">${this.$t(
                                'leastNum'
                            )} 0 ${this.$t('times')}</div>
                            <div class="years-info">${this.$t(
                                'yearsInfoToCall'
                            )}</div>
                            `,
                            closeOnClickOverlay: true,
                            confirmButtonText: this.$t('toCall'),
                            cancelButtonText: this.$t('toClose')
                        }).then(() => {
                            // 拨打客服电话
                            jsBridge.gotoCustomerService()
                        })
                    } else {
                        if (monthTimes <= 0) {
                            this.$confirm({
                                className: 'remaining-container',
                                message: `
                            <div class="years-info">${this.$t(
                                'leftTimes',
                                monthTimes,
                                yearTimes
                            )}${this.$t('retryNextMonth')}</div>
                            `,
                                showConfirmButton: false,
                                cancelButtonText: this.$t('iKnow'),
                                cancelButtonColor: '#0D50D8',
                                closeOnClickOverlay: true
                            })
                        } else {
                            this.$confirm({
                                className: 'remaining-container',
                                message: `
                            <div class="title">${this.$t(
                                'leftTimes',
                                monthTimes,
                                yearTimes
                            )}</div>
                            <div class="text">${this.$t('timesLimit')}</div>
                            `,
                                confirmButtonText: this.$t('startRisk'),
                                cancelButtonText: this.$t('toCancel'),
                                closeOnClickOverlay: true
                            }).then(() => {
                                // 开始测评
                                // 跳转到风险测评
                                this.$router.push({
                                    path: '/risk-assessment',
                                    query: {
                                        notFirstSubmit: true
                                    }
                                })
                            })
                        }
                    }
                    // this.showRemainingNum = true
                } catch (e) {
                    console.log(e)
                    e.msg && this.$toast(e.msg)
                }
