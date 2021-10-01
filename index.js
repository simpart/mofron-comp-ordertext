/**
 * @file mofron-comp-ordertext/index.js
 * @brief component module template for developper
 * @license MIT
 */
const Text  = require("mofron-comp-text");
const Fade  = require("mofron-effect-fade");
const Slide = require("mofron-effect-slide");

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) string: text contents
     *                key-value: component config
     * @short text
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("OrderText");
            this.shortForm('text');

            /* init config */
	    this.confmng().add("text_buf", { init:'', type:"string" });
	    this.confmng().add("delay", { init:50, type: "number" });
            this.confmng().add("delayOffset", { init:0, type: "number" });

	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
	    this.rootDom(new mofron.class.Dom("div", this));
	    this.style({ 'display' : 'flex' });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * text setter/getter
     * 
     * @param (mixed) string: text value
     *                undefined: call as getter
     * @return (string) text value
     * @type parameter
     */
    text (val) {
        try {
	    if (undefined === val) {
                /* getter */
		return this.confmng("text_buf");
	    }
	    /* setter */
	    if ('string' !== typeof val) {
                throw new Error("invalid parameter");
	    }
	    this.confmng("text_buf",val);
            
	    let txtcmp;
            for (let tidx=0; tidx < val.length; tidx++) {
	        let delay_tm = this.delayOffset() + this.delay() * tidx;
	        txtcmp = new Text({
                    text: val[tidx],
		    effect: [
                        new Fade({ value: true, speed: 300, delay: delay_tm }),
                        new Slide({ direction: 'left', value: "0.1rem", delay: delay_tm })
                    ]
                });
                this.child(txtcmp);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * timing for order effect
     * 
     * @param (number) effect timing
     * @type parameter
     */
    delay (prm) {
        try {
            return this.confmng("delay",prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * delay for order effect
     * 
     * @param (number) effect delay
     * @type parameter
     */
    delayOffset (prm) {
        try {
            return this.confmng("delayOffset",prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * text size
     * 
     * @param (size) text size
     * @
     */
    size (val, opt) {
        try {
	    let chd = this.child();
	    for (let cidx in chd) {
                chd[cidx].size(val,opt);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    font (prm) {
        try {
            let chd = this.child();
            for (let cidx in chd) {
                chd[cidx].font(prm);
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
