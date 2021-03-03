package com.yxzq.stock.module.quote.view.kline_chart.chart.core;


import com.yxzq.stock.module.quote.view.kline_chart.KLineNode;
import com.yxzq.stock.module.quote.view.kline_chart.KLineUtil;
import com.yxzq.stock.module.quote.view.kline_chart.settings.KLineSettings;
import com.yxzq.stock.module.quote.view.kline_chart.settings.config.core.CoreConfigRsi;

import java.util.List;


public class KLineCoreRSI extends BaseKLineCore {


    public final int[] mRsiCycles;
    public final boolean[] mRsiEnable;

    public double mUpRangeSMA[];
    public double mTotalRangeSMA[];

    public double mRSI[][];

    public KLineCoreRSI(List<KLineNode> list) {
        CoreConfigRsi config = KLineSettings.getRsiConfig();

        mRsiCycles = new int[config.getMaCount()];
        mRsiEnable = new boolean[mRsiCycles.length];
        for (int i = 0; i < config.getMaCount(); i++) {
            mRsiCycles[i] = config.getCycle(i);
            mRsiEnable[i] = config.isEnable(i);
        }
        mUpRangeSMA = new double[mRsiCycles.length];
        mTotalRangeSMA = new double[mRsiCycles.length];
        parser(list);
    }


    @Override
    public void parser(List<KLineNode> list) {
        super.parser(list);
        if (list == null) {
            return;
        }


        mRSI = new double[mRsiCycles.length][list.size()];

        KLineNode node;

        double range;

        for (int i = 0; i < list.size(); i++) {
            node = list.get(i);

            if (node.mPClose < 0) {
                continue;
            }

            range = node.mClose - node.mPClose;
            for (int j = 0; j < mRsiCycles.length; j++) {
                if (i > mRsiCycles[j] - 1) {
                    if (range > 0) {
                        mUpRangeSMA[j] = (range + (mRsiCycles[j] - 1) * mUpRangeSMA[j]) / mRsiCycles[j];
                    } else {
                        mUpRangeSMA[j] = (mRsiCycles[j] - 1) * mUpRangeSMA[j] / mRsiCycles[j];
                    }


                    mTotalRangeSMA[j] = (Math.abs(range) + (mRsiCycles[j] - 1) * mTotalRangeSMA[j]) / mRsiCycles[j];


                    if (KLineUtil.doubleEqualsZero(mTotalRangeSMA[j])) {
                        mRSI[j][i] = 100;
                    } else {
                        mRSI[j][i] = (mUpRangeSMA[j]) / (mTotalRangeSMA[j]) * 100;
                    }

                } else {
                    if (range > 0) {
                        mUpRangeSMA[j] += range;
                    }

                    mTotalRangeSMA[j] += Math.abs(range);

                    if (i == mRsiCycles[j] - 1) {
                        mUpRangeSMA[j] = mUpRangeSMA[j] / mRsiCycles[j];
                        mTotalRangeSMA[j] = mTotalRangeSMA[j] / mRsiCycles[j];
                        if (KLineUtil.doubleEqualsZero(mTotalRangeSMA[j])) {
                            mRSI[j][i] = 100;
                        } else {
                            mRSI[j][i] = (mUpRangeSMA[j]) / (mTotalRangeSMA[j]) * 100;
                        }
                    } else {
                        mRSI[j][i] = 0;
                    }
                }
            }
        }

    }


    @Override
    public synchronized void updateLastNode(List<KLineNode> list, KLineNode oldLastNode) {
        int index = list.size() - 1;
        KLineNode node = list.get(index);
        if (Double.compare(node.mClose, oldLastNode.mClose) == 0)
            return;

        double oldRange = oldLastNode.mClose - oldLastNode.mPClose;

        double newRange = node.mClose - node.mPClose;

        for (int j = 0; j < mRsiCycles.length; j++) {

            if (index < mRsiCycles[j] - 1) {
                continue;
            }


            if (oldRange > 0) {
                mUpRangeSMA[j] = mUpRangeSMA[j] * mRsiCycles[j] - oldRange;
            } else {
                mUpRangeSMA[j] = mUpRangeSMA[j] * mRsiCycles[j];
            }

            if (newRange > 0) {
                mUpRangeSMA[j] = (newRange + mUpRangeSMA[j]) / mRsiCycles[j];
            } else {
                mUpRangeSMA[j] = (mUpRangeSMA[j]) / mRsiCycles[j];
            }

            mTotalRangeSMA[j] = (mTotalRangeSMA[j] * mRsiCycles[j] - Math.abs(oldRange) + Math.abs(newRange)) / mRsiCycles[j];

            if (KLineUtil.doubleEqualsZero(mTotalRangeSMA[j])) {
                mRSI[j][index] = 100;
            } else {
                mRSI[j][index] = (mUpRangeSMA[j]) / (mTotalRangeSMA[j]) * 100;
            }
        }

    }

}


,
        filterAreaCodeFnc: {
            type: Function
        }


        const list = [].concat(
                        result.commonCountry || [],
                        result.othersCountry || []
                    )
                    if (
                        this.filterAreaCodeFnc &&
                        typeof this.filterAreaCodeFnc === 'function'
                    ) {
                        this.countryArea = this.filterAreaCodeFnc(list)
                    } else {
                        this.countryArea = list
                    }

                    filterAreaCodeFnc(list) {
            return (list || []).filter(item => item.area === '+86')
        }

        :filterAreaCodeFnc="filterAreaCodeFnc"