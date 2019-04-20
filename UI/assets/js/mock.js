
const Mock = (function(){
    const HomeTopMenu = {
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

    const loans = {
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
    }; 

    const clients = {
        childComponent: 'clients-card',
        childTag: 'cards',
        childNodes: [
            {
                userId:  '#88828289',
                status: 'Approved',
                userJoinedDate: '31 Mar 2019',
                userLoans: 1,
                userEmail: "john@example.com"
            },
            {
                userId:  '#88828288',
                status: 'Pending',
                userJoinedDate: '31 Mar 2019',
                userLoans: 1,
                userEmail: "mike@example.com"
            },
        ]
    };

    const clientDetails = {
        '#88828289': {
            userId:  '#88828289',
            status: 'Approved',
            userJoinedDate: '31 Mar 2019',
            userLoans: 1,
            userEmail: "john@example.com",
            userFirstName: "Mark",
            userLastName: "Paul",
            userMobile: "081324590789",
            userAddress: "lekki",
            action: {
                childTag: 'action',
                childComponent: {type: 'literal', data:' <button class="btn float-right overlay-btn client-action" data-action="{{buttonAction}}">{{text}}</button>'},
                childNodes: [
                        {
                            text: "Approve",
                            buttonAction: 'approve'
                        },
                        {
                            text: "Reject",
                            buttonAction: 'approve'
                        }
                    ]
            }
        },
        '#88828288': {
            userId:  '#88828288',
            status: 'Pending',
            userJoinedDate: '31 Mar 2019',
            userLoans: 1,
            userEmail: "mike@example.com",
            userFirstName: "Mike",
            userLastName: "John",
            userMobile: "081324455789",
            userAddress: "lekki"
        },
    };

    const adminSidebar = {
        "accountName": "Mike John",
        "inboxCount": 1,
        "links": {
            childTag: 'links',
            childComponent: {type: 'literal', data:'<a href="{{href}}">{{text}}</a>'},
            childNodes: [
                    {
                        text: "Loans",
                        href: './loans.html',
                    },
                    {
                        text: "Clients",
                        href: './clients.html',
                    },
                    {
                        text: "Repayments",
                        href: './repayments',
                    }
                ]
        }
    };

    const clientSidebar = {
        "accountName": "Mike John",
        "inboxCount": 1,
        "links": {
            childTag: 'links',
            childComponent: {type: 'literal', data:'<a href="{{href}}">{{text}}</a>'},
            childNodes: [
                    {
                        text: "Loans",
                        href: './loans.html',
                    },
                    {
                        text: "Apply",
                        href: './application.html',
                    }
                ]
        }
    };

    const message = {
        categories: {
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
        },
        details: {
            "#88828289": {
                subject: "Approval of Loan #9908udu",
                content : "Loan Approved",
            }
        }
    };
    const clientTopMenu = {
        childTag: 'links',
        childComponent: {type: 'literal', data:'<a href="{{href}}">{{text}}</a>'},
        childNodes: [
                {
                    text: "Logout",
                    href: './home.html',
                }
            ]
    };

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
        
    };

    const loanDetails = {
        "#88828288" : {
            loanId:  '#88828288',
            status: 'Current',
            applicationDate: '30 Mar 2019',
            loanAmount: 6000,
            loanTenor: 6,
            loanBalance: 3000,
            nextRepayment: '31 Mar 2019',
            action: {
                childTag: 'action',
                childComponent: {type: 'literal', data:' <button class="btn float-right overlay-btn loan-action" data-action="{{buttonAction}}">{{text}}</button>'},
                childNodes: [
                        {
                            text: "Post Repayment",
                            buttonAction: 'Repayment'
                        }
                    ]
            }
        },
        "#88828289" : {
            loanId:  '#88828289',
            status: 'Pending Approval ',
            applicationDate: '31 Mar 2019',
            loanAmount: 6000,
            loanTenor: 6,
            loanBalance: 3000,
            nextRepayment: '31 Mar 2019',
            action: {
                childTag: 'action',
                childComponent: {type: 'literal', data:' <button class="btn float-right overlay-btn loan-action" data-action="{{buttonAction}}">{{text}}</button>'},
                childNodes: [
                        {
                            text: "Approve",
                            buttonAction: 'Approval',
                        },
                        {
                            text: "Reject",
                            buttonAction: 'Rejection',
                        }
                    ]
            }            
        },
    };

    return {
            HomeTopMenu,
            loans,
            adminSidebar,
            clientSidebar,
            message,
            clientTopMenu,
            repayments,
            loanDetails,
            clientDetails,
            clients
        }
}());