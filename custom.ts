
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */



/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace I2C_LCD1602 {
    /**
     * TODO: describe your function here
     * @param e describe parameter here
     */
    let i2cAddr: number
    let BK: number
    let RS: number

    function setreg(d: number) {
        pins.i2cWriteNumber(i2cAddr, d, NumberFormat.Int8LE)
        basic.pause(1)
    }

    function set(d: number) {
        d = d & 0xF0
        d = d + BK + RS
        setreg(d)
        setreg(d + 4)
        setreg(d)
    }

    function cmd(d: number) {
        RS = 0
        set(d)
        set(d << 4)
    }

    function dat(d: number) {
        RS = 1
        set(d)
        set(d << 4)
    }

    //% block
    export function i2cLcdInit(addr: number) {
        i2cAddr = addr
        BK = 8
        RS = 0
        cmd(0x33)
        basic.pause(5)
        set(0x30)
        basic.pause(5)
        set(0x20)
        basic.pause(5)
        cmd(0x28)
        cmd(0x0C)
        cmd(0x06)
        cmd(0x01)
    }

    //% block
    export function i2cLcdShowChar(ch: string, x: number, y: number): void {
        let a: number

        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        cmd(a)
        dat(ch.charCodeAt(0))
    }

    //% block
    export function i2cLcdShowNumber(n: number, x: number, y: number): void {
        let s = n.toString()
        i2cLcdShowString(s, x, y)
    }

    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function i2cLcdShowString(s: string, x: number, y: number): void {
        let a: number

        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        cmd(a)

        for (let i = 0; i < s.length; i++) {
            dat(s.charCodeAt(i))
        }
    }

    //% block
    export function i2cLcdOn(): void {
        cmd(0x0C)
    }

    //% block
    export function i2cLcdOff(): void {
        cmd(0x08)
    }

    //% block
    export function i2cLcdClear(): void {
        cmd(0x01)
    }

    //% block
    export function i2cLcdBacklightOn(): void {
        BK = 8
        dat(0)
    }

    //% block
    export function i2cLcdBacklightOff(): void {
        BK = 0
        dat(0)
    }

}
