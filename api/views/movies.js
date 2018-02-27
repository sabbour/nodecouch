exports.by_id = {  
    map: function(doc) {
      if (doc.id) {
        emit(doc.id, {_id: doc._id});
      }
    }
  };