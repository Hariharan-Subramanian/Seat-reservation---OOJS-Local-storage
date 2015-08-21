/* seat class*/

var seatClass = function() {
    this.seatMode = 0;
    this.seatNo = 0;
}

/* User class*/

var userClass = function() {
    this.userName = '';
    this.seatCount = 0;
    this.confirmedSeats = [];
}
userClass.prototype.allUser = [];
userClass.prototype.storeSeatdata = function() {
    var userinfo = {
        'uname': this.userName,
        'seatcount': this.seatCount,
        'confirmedseats': this.confirmedSeats
    };

     if (typeof(localStorage) !== "undefined") {
     	if(localStorage.getItem('userinfo') != null){	
     		var prevdata=JSON.parse(localStorage.getItem('userinfo'));
     		var that=this;
     		$.each(prevdata,function(key,item){
				that.allUser.push(item);
     		});
     	}
     	this.allUser.push(userinfo);   
        localStorage.setItem('userinfo', JSON.stringify(this.allUser));
    } else {
        console.log('local storage doesnot support');
    }
}