const Mock = (function(){
    const topMenu = (() =>{
        const url = window.location.href.split('/')
        const page = url[url.length -1];
        let template = {
            childTag: 'links',
            childComponent: {type: 'literal', data:'<a href="{{href}}">{{text}}</a>'},
            childNodes: [
                    {
                        text: "Logout",
                        href: './home.html',
                    }
                ]
        };

        if(page == 'home.html') {
            template = {
                childTag: 'links',
                childComponent: {type: 'literal', data:'<a href="{{href}}">{{text}}</a>'},
                childNodes: [
                        {
                            text: "Login",
                            href: '#login',
                        },
                        {
                            text: "Signup",
                            href: '#signup',
                        }
                    ]
            };
        }
        return template;
    })();


    const sideBar = (() =>{
        return {
            "accountName": "Mike John",
            "inboxCount": 1,
            "links": {
                childTag: 'links',
                childComponent: {type: 'literal', data:'<a href="{{href}}">{{text}}</a>'},
                childNodes: [
                        {
                            text: "Login",
                            href: '#login',
                        },
                        {
                            text: "Signup",
                            href: '#signup',
                        }
                    ]
            }
        }
    })();

    const cardContainer = {
        childNodes: [
            {
                loanId:  '#88828289',
                status: 'Current',
                applicationDate: '31 Mar 2019',
                loanAmount: 6000,
                loanTenor: 6,
                loanBalance: 3000,
                nextRepayment: '31 Mar 2019'
            },
            {
                loanId:  '#88828288',
                status: 'Repaid',
                applicationDate: '30 Mar 2019',
                loanAmount: 6000,
                loanTenor: 6,
                loanBalance: 3000,
                nextRepayment: '31 Mar 2019'
            },
        ]
    }

    const repayments = {
        "#88828288" : {
                    childNodes: [
                        {
                            paymentId: '#9i998746564',
                            paymentDate: '31 March 2019',
                            paymentAmount: 6000,
                            balance: 6000
                        },
                        {
                            paymentId: '#9i998746564',
                            paymentDate: '31 March 2019',
                            paymentAmount: 6000,
                            balance: 6000
                        }
                    ]
                },
        "#88828289" : {
                    childNodes: [
                        {
                            paymentId: '#9i998746564',
                            paymentDate: '31 March 2019',
                            paymentAmount: 6000,
                            balance: 6000
                        }
                    ]
                }
        
    }

    const loanDetails = {
        "#88828288" : {
            loanId:  '#88828288',
            status: 'Repaid',
            applicationDate: '30 Mar 2019',
            loanAmount: 6000,
            loanTenor: 6,
            loanBalance: 3000,
            nextRepayment: '31 Mar 2019'
        },
        "#88828289" : {
            loanId:  '#88828289',
            status: 'Current',
            applicationDate: '31 Mar 2019',
            loanAmount: 6000,
            loanTenor: 6,
            loanBalance: 3000,
            nextRepayment: '31 Mar 2019'
        },
    }
    

    const messageCategoryDetails = {
        "#88828289": {
            subject: "Approval of Loan #9908udu",
            content : "Loan Approved",
        }
    }

    const messageCategory = {
        childNodes: [
            {
                text: 'New',
                class: 'new-message active-category',
                linkClass: 'new-message'
            },
            {
                text: 'Loan-#88iodha98',
                linkClass: 'view-message',
                messageId: '#88828289',
            }
        ]
    }

    return {
            mock: () => {
                render('sidebar', sideBar);
                // render('top-menu', topMenu);
                // render('card-container', cardContainer);
                // render('message', messageCategoryDetails);
                // render('message-category', messageCategory );
                // render('message-single-category', messageCategoryDetails);
            },
            data: {
                repayments,
                loanDetails,
                message: messageCategoryDetails
            }
        }
}());