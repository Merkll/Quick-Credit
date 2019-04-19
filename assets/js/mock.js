
const Mock = (function(){
    const isAdmin = () => {
        const url = window.location.href.split('/');
        const sidebarMode = url[url.length - 2];
        return sidebarMode == 'admin';
    }
    const getPage = () => {
        const url = window.location.href.split('/');
        return url[url.length - 1];
    }
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
        const admin = {
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

        const user = {
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
        }
        return (isAdmin()) ? admin : user;
    })();

    const cardContainer = ((isloan = false) => {
        const loan = {
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
                    userId:  '#88828289',
                    status: 'Pending',
                    userJoinedDate: '31 Mar 2019',
                    userLoans: 1,
                    userEmail: "mike@example.com"
                },
            ]
        } 
        if(isloan) return loan;
        return (getPage() == 'clients.html') ? clients : loan;
    });

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
    }

    const clients = {
        '#88828289': {
            userId:  '#88828289',
            status: 'Approved',
            userJoinedDate: '31 Mar 2019',
            userLoans: 1,
            userEmail: "john@example.com"
        },
        '#88828289': {
            userId:  '#88828289',
            status: 'Pending',
            userJoinedDate: '31 Mar 2019',
            userLoans: 1,
            userEmail: "mike@example.com"
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
                render('top-menu', topMenu);
                render('card-container', cardContainer());
                render('message', messageCategoryDetails);
                render('message-category', messageCategory );
                render('message-single-category', messageCategoryDetails);
                render('single-loan', {}, {repayments: repayments["#88828289"],
                    loanDetails: loanDetails["#88828289"]});
            },
            data: {
                repayments,
                loanDetails,
                clients,
                cardContainer,
                message: messageCategoryDetails
            }
        }
}());