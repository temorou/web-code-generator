//数据转ASSCI码
function toChar(str) {
    return ('000'+str.charCodeAt()).replace(/^.*(.{3})$/,'$1')
}
function toAs(str) {
    let res = '';
    for(let i=0;i<str.length;i++){
        res+=toChar(str[i])
    }
    return res
}
//ASSCI码数据转
function toStr(str) {
    let res = '';
    for(let i=0;i<str.length;i+=3){
        res+=String.fromCharCode(str.substring(i,i+3))
    }
    return res
}
var enCodeStr = "wTKq056Axum1V2rtYFsyC7d3XoefnzURg~NkODQ9-4McvliLIGBS8JWEPHZapbhj"
//64进制转10进制
function string64to10(number_code) {
    var match = number_code.match(/^0*/)[0]
    var chars = enCodeStr,
        radix = chars.length,
        number_code = String(number_code),
        len = number_code.length,
        i = 0,
        origin_number = BigInt(0);
    while (i < len) {
        origin_number += BigInt((BigInt(radix)**BigInt(i++)) * BigInt(chars.indexOf(number_code.charAt(len - i) || 0)));
    }
    return match+origin_number.toString();
}
//10进制转64进制
function string10to64(number) {
    var match = number.match(/^0*/)[0]
    var chars = enCodeStr.split(''),
        radix = BigInt(chars.length),
        qutient = BigInt(number),
        arr = [];
    do {
        mod = qutient % radix;
        qutient = (qutient - mod) / radix;
        arr.unshift(chars[mod]);
    } while (qutient);
    return match+arr.join('');
}
console.log(toStr(string64to10(`0KBYxlHBBCTIWV7Sqdn3UPG5T8Xo8vPBhXGtGxlbW4VuYy-6VMSZoijZo-viBVLGQgmsYcuIA5QkC1pidnXR1I2waIkfOAXIf8J-zryTBfZ~6ZTUpCoz~bzqhYYF555~6L747KMxHTReqrwBKmnD85juVky-tIgkmicEWR3cmf-W9mPW5rvRaEHklP8TRHBvkavZ1P4VgXz2MmZ7vtAoQjztPVmAiUilteHldvLCvWEZ4LQC0aV9PWlvh04VBdxynmCQL22Ux9t4nSXHa8JCjSSiIptHaDBqP9~5aoA5NR80bjMjefYat3mH2D3tLJR3FcVvdrGH83sUBOFx-K5z0~M7rdtabXtIU40ol-~zCKNCLG05XtgVmwTztZtNdqUTfe6CzaVxGTHhNeZR0s9HBpU1I2Mz~96EvK9l3fS-iv-ErKC2bgmhBY6k4FU1XQeiXB0a0VleBjsYqTR8Xpq2zg9zsW1~lbmO8zfVGwgdjm3ZISRr1Wc~x-KcknayEe5jj-~NqfivEqshCrc6T~B0EMzdjEXDZnbHYr-y5uODfytYrOZRyI1M1j1wZwHNf6k8J6nEnMOKewqbHzuq5snL7CrY04VyqnXy9PDaFxR4F9qYqWB9FeFuc9yqPrZkku6NFXY9WKWXdhUeVF5HLLIpFb7oFq1obnL0RJPh1WeZWyg1ZpgTQDZn5mktcUsAfHEDXajKzfIXvlxGoQ9FzFJnmAkHgceQqK0zs~0StVxbyAiTy92X3WXsC7i4uIBerfpnlCK0PowlKb940VB-iAkWHOAj-48i3n76IYSTXBGiICvY87QJv3yb6zv8FcWmVkyOtdZRKvYAUnoaz1ks7fDWFAviPFFKjXJRQMxYlzAtm4r2snStHBG--E9Py2kIp7pmOymSM1GlIQjJi3R2ydatPXCQSEGFCdgxjrhv2vZ5pHRqqcGuh5mHykLdzU1mzlPUQC1QIewqYMQWJudMDsrRsI0uKUwPh1hpiul1ZNjtcc48vcDCr0f5Z48I3C2-JHKDqOj0K08qsKwxWcMZhXdI8qCc5DEkpCWHGIBbK4oEowYJFU5u0BjUMfNs8Q8qoyE1trd2JGdF7nJrEyHYLobaBXU6SelSx8Fy1UE-g~QjHc~G0xaKkAa9ReWYK-OOAhnGWbZg415O-ByEzOm-fa5Dg0h3cexhJkJn-oWwuec2Z33OodySKvLhZxg23hFep9za9k2Fch0aHX86asIAKxXKpcEYpbmEcrKfmZ2OD5YpJzv0G-kQJjmeOA~4YFcxkG4sXZ9PkbcCjTNT1dOPiWNYpg6LzxZqhg3t1awCWHrT7NR2lN4XojG1YJMk0y~~A3bka5jk8C60Rm~N~4NIw21SeAqHjeqxQFu8AuxMd2fnp6BiJk0h1qHG~~e2UqH4RXJ02BZvrSOWCJL1aJz1T8UiHiXs9avn6tM-iXHovLYva9ULTao0NfQY2QdIIYROUUhvqJMRXCmd9~OKkLwLk92yT-AeK5HtzgfSzwXBHTSukblYkYoSFTIvqIeHCL-Zq-f9x9unTRYQ7B~TbTeXMdrSl0p2NIXpB7Yp-iNjCcAXJ~DL2NAmYfFKdERiaaUDC1RCjLGnIN~ASfJmCnAqek8uWzlILNdeqPyMr2eamo33MTYJ8mTiocPneCCF8x6Wmz9kosgPWH-2VHoT0pC-DxKRBhTc0e8h1YgcZNW2rXv4HVE5Gsd9qJC9k2wUO8O8nv1n7SqqxoPOuOox20O9huTacAn~hCsKtt3WxaQZEHjllKD24xZEfoSlr3ADFuJLMEGK4JPCnAW2WlBo82VlRbJCRe-6rs6ZqeLf7HeslJCEwQM8Z5jKNQtpxI-5Dnud5LpTmQzv1fM42WMPgTCkcaWDwmz7RIWl6TeNpKET6HjdwKRKpSI1XIjoqU0C20kccaGnri4hnWaSSJfVu4DbMjBb4h1fbR25yKuajyvnO2YznujFRLJkIrRL1~e9TIvbqIzhwANOgtbPdScCLzJCvv5-ZL4x9rKC~lhIumYQTuW~BTKNwBlW21yQ~tUZ5eQk35a2CcM3iGQlhbQ5Sg8qZim-cAYOPFMZrWZoXBPW9u~NJ0K8i1nE5fQgeHQNCC~Gx~u2EYk5jP-tqDhtDNoYMSfgrZDbp1uUKQCXgafTGdgKSUxMSRrytzovwi85nFdh~lksnkghMbZ0I6cboHWOy0fmQCcHdKjhurIHORfUIGuasVP6bDbSKJg5P8iECCoF4MF2CW2K9TNXpOnHmZ6UvrcdMX5506QzHcfl70jndhJk3XqesTue4q33I4v5oLWIQSJFlGHF4eYOI2XSZTkxG5gWbHhWjRhEkyflK49r6EX1DdwS6WqOvt7imjEAGtyVwatjncrTEt4rZnYQF97E9L4zXKYoHORz-PKsByTbUeWu86p6HPSwVP~m-aJp8PCAVaxIBtwUKby9V4RAwidgZnWRTTeWkgTdBRedxMcE-bj3ZObsE9KqxgSRdSSnrAhd8d-CnWIGuviGo1a8wC5ARVxwJ-Eh9If2lBwSby8OzK6iGP~zy620~6If8NPSICE7x5UPoAiEIaMWAugAUjhvHMBDCfzGn7tVS7bDFsG4HX9He-2PrKL7M0smS4tAE9CxywmNQ82bDQaMQIQE17~zrpFKuaNLZaOqTe6M8exwaj7AS8lu6v~YaSi0Y8VhLTW15A5o2PeHfGvkjKX0zf8Vip0itqCfx6zJnuGNRSmQ5cZOj0bo4wleUb1oacvQuMJM94I5g0s2F8Cv6J2X3aGLqQ-Rb0a~mxq-kh56PNmj7Rg0eiBcQPlamjJVsgxWr~LD61KtQlELEXoHNECvaqVyfPktBmWlJl-Z6yDVViVA6OrmtS32cgQ8m7bY8hxjuIbKwh8y81O3c4N5IVOshEpjiJhdFOR2tP51mLmJDBQaawOHlmTxtyQ93616LpPZqJmru-tqVshomYCzhXFW6oGb4X52ONUgKygnhDPk-fNWCtVhZGiIvn7-8mOkAx-NhNSW40U~qpmIr5aNkB7OPeqwOiaZ8Fy8GabkSdEnfeVgyw8qYgW4cKDHQjvoLljXipJs1t69k8dAQblwVOW7H2vEiEHw2T-m8cgYDyXt5HFy2axVD08Jkp2I6~uq177Lh65eQNP7KdXqdLCzgAVdAWuqhOXeRPFqsMBH4cygQVkElYH9huehJjOJjg7gLsBGJo7RB0QWD045P~u46ltMk3XBjUN0~dtu-KomROuc~y7QgEigD~gYbTpg8C8SmKxz29qQDLa61OstFeMyFnoAGLQBbSEX5N1672nd6S2R5WpY3xkxUJvXa-YQxcnjd8FAGzQU00rOWUqLR8uzk~w-8TRqjFGybzfZont88PSOcWyccQGwmylw7pELpSTmDRjm5fWgD6oH5ZSler5YmYuvRtqu7hL26D~Uvtjov2p8MmD6dFmFghbxK2bApwmunRPGfcaLbGexGKDEuKrpsQ93ckkgOkWDcBwJHjbw2zpIPWCv-Wbn0LcY4fe~J5PPGEHZfw7Yx6BpUPzkLzOB5diLXTPKiT6KTBZv7IjQEcClqG`)))
