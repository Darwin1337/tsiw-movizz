function verifyFields(email,password){
    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(validRegex)) {
      this.aux="Wrong Email";
      return false;
    }
    else if(password.length < 8) {
      this.aux="Wrong Password";
      return false;
    }
    else
    {
      return true;
    }
  }
  module.exports = verifyFields;