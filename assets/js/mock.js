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
                // data: 'a'
            },
            {
                text: "Name",
                href: '/home',
                // data: 'a'
            }
        ]
    }

    const sideBar = {
        "accountName": "Mike John",
        "inboxCount": 55
    }

    const cardContainer = {
        childrenTemplate: 'loans-card',
        childrenTag: 'cards',
        data: [
            {
                loanId: "#88828288" 
            }, {
                loanId: "#88828289"
            }
        ]
    }

    const repayments = {
        // childComponent: 'repayments-table-row',
        // childTag: 'repayments',
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
            },
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
    }

    const loanDetails = {
        loanId:  '#9i998746564',
        status: 'pending',
        applicationDate: '31 Mar 2019',
        loanAmount: 6000,
        loanTenor: 6,
        loanBalance: 3000,
        nextRepayment: '31 Mar 2019'
    }

    const messageCategoryDetails = {
        subject: "Approval of Loan #9908udu",
        content : "Loan Approved",
        action: '<a href="">Reply</a>'
    }
    const messageCategory = {
        childrenTemplate: 'message-single-category',
        childrenTag: 'category',
        data: [
            {
                text: 'New'
            },
            {
                text: 'Loan-#88iodha98',
                class: 'active-category'
            }
        ]
    }

    return () => {
        render('sidebar', sideBar)
        render('top-menu', dashboardTopMenu)
        // render('alert', {})
        // // render('notification', {})
        // // render('modal', {})
        // render('card-container', cardContainer)
        render('repayments', repayments)
        render('loan-details', loanDetails)
        // render('message', messageCategoryDetails)
        // render('message-category', messageCategory )
        // render('message-single-category', messageCategoryDetails)
    }
}());