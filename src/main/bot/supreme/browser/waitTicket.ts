const waitTicket = () => `(() => {
        return new Promise((res, rej) => {
            (function waitTicket() {
                let cookieObj = {};
                document.cookie.split(';').forEach(each => {
                    if (each.includes('=')) cookieObj[each.split('=')[0].trim()] = each.split('=')[1].trim()
                })
                if (cookieObj['ticket'] && cookieObj['_ticket']) {
                    if (parseInt(cookieObj['_ticket'].substr(cookieObj['_ticket'].length - 10)) > parseInt(cookieObj['ticket'].substr(cookieObj['ticket'].length - 10))) {
                        try {
                          document.querySelector('#mobile_checkout_form').setAttribute('data-credit_verified', 1);
                        } catch {}
                        res();
                    } else {
                        setTimeout(waitTicket, 100);
                    }
                } else {
                    res();
                }
            })();
        });
    })();
`;

export { waitTicket };
