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
    
    text (prm) {
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
            for (let pidx in prm) {
                this.child([new Text({ text: prm[pidx], visible: false })]);
            }
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
}
module.exports = mf.comp.OrderText;
/* end of file */
