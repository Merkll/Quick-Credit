(function(){
    const templateHtml = `
        <div class="subject">
                <label for="">Subject</label>
                <input type="text" value="{{subject}}">
        </div>
        <div class="body">
                <label for=""> Body</label>
                <textarea name="" id="" cols="30" rows="10">{{content}}</textarea>

        </div>
        <div class="action">
                {{action}}
        </div>
 `;


    const message = {
        root: 'message-root',
        classNames: [],
        template: templateHtml
    };
    templates['message'] = message;
}());