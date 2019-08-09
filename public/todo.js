window.Todo = {

  url: '/todo',

  create: function(text, callback) {
    return $.ajax({
      url: this.url,
      type: 'POST',
      dataType: 'json',
      data: {todoText: text},
      success: callback
    });
  },

  readAll: function(callback) {
    return $.ajax({
      url: this.url,
      type: 'GET',
      dataType: 'json',
      success: callback
    });
  },

  readOne: function(id, callback) {
    return $.ajax({
      url: `${this.url}/${id}`,
      type: 'GET',
      dataType: 'json',
      success: callback
    });
  },

  update: function(id, text, callback) {
    return $.ajax({
      url: `${this.url}/${id}`,
      type: 'PUT',
      dataType: 'json',
      data: {todoText: text},
      success: callback
    });
  },

  delete: function(id, callback) {
    return $.ajax({
      url: `${this.url}/${id}`,
      type: 'DELETE',
      dataType: 'json',
      success: callback
    });
  }
};
