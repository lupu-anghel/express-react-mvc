/* ------------------------------------------
|   Store here non-specific functionalities that
|   can be used across multiple scenarios
|  ------------------------------------------ */

const helpers = {

    errorResponse: function (obj) {
        const errors = obj.error.details;
        let msg      = {};
        for(let i = 0, len = errors.length; i < len; i++){
            // msg[i] = {
            //     field: errors[i].context.key, 
            //     message: errors[i].message
            // }
            msg[errors[i].context.key] = errors[i].message;
        }
        return msg;
    },
    hateoas: function (link,data) {
        let newData = []
        for(let i = 0, len = data.length; i < len; i++){
            newData[i] = [];
            newData[i] = JSON.parse(JSON.stringify(data[i]));
           newData[i]['_links'] = [
                { rel: 'self', method: 'GET', href: link + data[i]['_id'] },
                // { rel: 'create', method: 'POST', href: link },
                // { rel: 'edit', method: 'PUT', href: link + data[i]['_id'] },
                // { rel: 'delete', method: 'DELETE', href: link + data[i]['_id'] }
           ]
            
        }
        return newData;
    }
}

module.exports = helpers;