/**
 * @file   mofron-comp-ordertext/index.js
 * @brief  order view text component
 * @author simpart
 */
const mf = require('mofron');
const Text = require('mofron-comp-text');
const OrdViw = require('mofron-effect-orderview');

mf.comp.OrderText = class extends Text {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('OrderText');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @npte private method
     */
    initDomConts () {
        try {
            super.initDomConts();
            this.style({ 'display': 'flex' });
            this.effect([new OrdViw(5)]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (prm, idx) {
        try {
            if (undefined === prm) {
                /* getter */
                let ret = '';
                let chd = this.child();
                for (let cidx in chd) {
                    ret += (true === mf.func.isComp(chd[cidx], 'Text')) ? chd[cidx].text() : '';
                }
                return;
            }
            /* setter */
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            let add_txt = null;
            let ctl_txt = null;
            for (let pidx in prm) {
                
                if (true === ctl_txt) {
                    if (';' === prm[pidx]) {
                        ctl_txt = false;
                    }
                    continue;
                }
                
                if ('&' === prm[pidx]) {
                    /* check control text */
                    ctl_txt = this.getCtrlText(prm.substring(pidx));
                    if (null !== ctl_txt) {
                        /* add control text */
                        add_txt = new Text({
                            text: ctl_txt,
                            color: (null !== this.mainColor()) ? this.mainColor() : undefined
                        });
                        ctl_txt = true;
                        this.addChild(add_txt, idx);
                        continue;
                    }
                }
                
                add_txt = new Text({
                    text: prm[pidx],
                    color: (null !== this.mainColor()) ? this.mainColor() : undefined
                });
                add_txt.visible((true === this.visible()) ? undefined : false);
                this.addChild(add_txt, idx);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getCtrlText (prm) {
        try {
            if ('&' !== prm[0]) {
                return null;
            }
            let ret = '';
            for (let pidx in prm) {
                ret += prm[pidx];
                if (';' === prm[pidx]) {
                    return ret;
                }
            }
            return null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    interval (prm) {
        try { return this.effect('OrderView').interval(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    mainColor (prm) {
        try {
            let ret = this.member(
                'mainColor',
                'string',
                (undefined !== prm) ? mf.func.getColor(prm).toString() : prm
            );
            if (undefined !== prm) {
                let chd = this.child();
                for (let cidx in chd) {
                    chd[cidx].mainColor(mf.func.getColor(prm).toString());
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.OrderText;
/* end of file */
