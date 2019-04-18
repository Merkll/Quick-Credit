const Mock = (function(){
    const homePageMenu = {
            links: [
                {
                    data: '<a href="#login">Login</a>'
                },
                {
                    data: '<a href="#signup">Signup</a>'
                }
            ]
    }

    const dashboardTopMenu = {
        childTag: 'links',
        childComponent: {type: 'literal', data:'<a href="{{href}}">{{text}}</a>'},
        childNodes: [
                {
                    text: "Logout",
                    href: '/home',
                }
            ]
    }

    const sideBar = {
        "accountName": "Mike John",
        "inboxCount": 55
    }

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
        subject: "Approval of Loan #9908udu",
        content : "Loan Approved",
        // action: '<a href="" class="">Reply</a>'
    }
    const messageCategory = {
        childNodes: [
            {
                text: 'New',
                class: 'new-message'
            },
            {
                text: 'Loan-#88iodha98',
                class: 'active-category'
            }
        ]
    }

    return {
            mock: () => {
                render('sidebar', sideBar)
                render('top-menu', dashboardTopMenu)
                render('card-container', cardContainer)
                render('message', messageCategoryDetails)
                render('message-category', messageCategory )
                render('message-single-category', messageCategoryDetails)
            },
            data: {
                repayments,
                loanDetails

            }
        }
}());