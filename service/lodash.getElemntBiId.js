const fs = require('fs');
const lodash = require('lodash');

function getObjectBiId(result, id, path) {
    var banners = lodash.map(result, function (object) {
        if (object._id == id) return object;
    });

    banners = lodash.without(banners, undefined);
  
    // if (path) {
    //     console.log('file remove');
    //     fs.unlink(banners.image);
    //     banners.image = path;
    // }
    return banners[0];
}
module.exports = getObjectBiId;