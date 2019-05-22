/* eslint-disable no-param-reassign */
((global) => {
  const templateHtml = `
        <div class="page-title">
            <a href="./single-client.html"><span>Client <i>{{userId}}</i></span></a>
            <span class="float-right color-grey">{{status}}</i></span>
        </div>
        <div class="details">
                <div class="form">
                    <div class="input-group">
                            <div class="input-wrapper">
                                    <label for="" class="primary-color">First Name</label>
                                    <input type="text" value="{{userFirstName}}" disabled>
                            </div>
                            <div class="input-wrapper">
                                    <label for="" class="primary-color">Last Name</label>
                                    <input type="text" value="{{userLastName}}" disabled>
                            </div>
                    </div>
                    <div class="input-group">
                        <div class="input-wrapper">
                                <label for="" class="primary-color">Email</label>
                                <input type="text" value="{{userEmail}}" disabled>
                        </div>
                        <div class="input-wrapper">
                                <label for="" class="primary-color">Mobile</label>
                                <input type="text" value="{{userMobile}}" disabled>
                        </div>
                    </div>
                    <div class="input-wrapper">
                            <label for="" class="primary-color">Address</label>
                            <input type="text" value="{{userAddress}}" disabled>
                    </div>
                    {{action}}
            </div>
        </div>
     `;
    
    
  const clientDetails = {
    root: 'client-details-root',
    classNames: [],
    template: templateHtml
  };
  global.templates['client-details'] = clientDetails;
})(this);
