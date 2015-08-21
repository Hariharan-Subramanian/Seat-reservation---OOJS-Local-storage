
var seatLimit = 120;
var seat = [];
var selectedSeat = [],bookedSeats=[];
var userObj, isselectionstart = false;

/* Creating Seat object */
function createSeatFn() {
	if(localStorage.getItem('confirmedSeat') != null){
		bookedSeats =JSON.parse(localStorage.getItem('confirmedSeat'));		
	 }
	 for (var i = 0; i < seatLimit; i++) {
        seat[i] = new seatClass()
        seat[i].seatNo = i;
        if ($.inArray(i, bookedSeats) > -1) {
        	seat[i].seatMode = 2;
        	$('#seat'+i).removeClass('seatmode0').addClass('seatmode2')
        }
    }
}
$(document).ready(function() {
	/* Underscore Js Configuration  */
	 _.templateSettings = {
        evaluate: /\{\%(.+?)\%\}/g,
        interpolate: /\{\{(.+?)\}\}/g
    };
    /* Pushing seat label template in to HTML */
    var demoTemplate = _.template($('#seatnoTemp').html());
    var newhtml = demoTemplate();
    $('#seatnos').append(newhtml);

    /* Pushing view label template in to HTML */
    demoTemplate = _.template($('#seatTemp').html());
    newhtml = demoTemplate();
    $('#seatsView').append(newhtml);

    updateUserlist();
    createSeatFn();   

    /* Seat selection Handling */
	$('.seat-class').on('click', function() {
         if (isselectionstart && selectedSeat.length< userObj.seatCount) {
            var thisobj = $(this);
            var sno = parseInt(thisobj.attr('sid'));
            var mode = seat[sno].seatMode;
            switch (mode) {
                case 0:
                    seat[sno].seatMode = 1;
                    thisobj.removeClass('seatmode0').addClass('seatmode1')
                    selectedSeat.push(seat[sno].seatNo)
                    break;
                case 1:
	                    seat[sno].seatMode = 0;
	                    var index = selectedSeat.indexOf(seat[sno].seatNo);
	                    if (index > -1) {
	  						  selectedSeat.splice(index, 1);
						}
	                   thisobj.removeClass('seatmode1').addClass('seatmode0')
	                break;
            }
      } else {
            alert('Enter above details / Seat limit exceeds');
      }
    });

    /* start Seat selection section  */

    $('#startSelection').on('click', function() {
	    if($('#usrname').val().length>0 && $('#seattotal').val()>0){
	        userObj=new userClass();
	        userObj.userName=$('#usrname').val();
	        userObj.seatCount=$('#seattotal').val();
	        $('#usrname,#seattotal').prop('disabled',true);	
	        isselectionstart=true;  
	    }else{
	     	alert('Enter Name and Seat details');
        }
    });

    /* Confirm section Handling */

    $('#confirm').on('click', function() {
    	if(userObj !=null){
		    if(selectedSeat.length==userObj.seatCount){
		    		var dummySeat=[];
		    		userObj.confirmedSeats=selectedSeat;
		    		bookedSeats=bookedSeats.concat(selectedSeat);
		    		userObj.storeSeatdata();
		    		localStorage.setItem('confirmedSeat',JSON.stringify(bookedSeats));
		    		updateUserlist();
		    		$.each(selectedSeat,function(key,item){
			    		$('#seat'+item).removeClass('seatmode0').addClass('seatmode2')
		    		});	
		    }else{
		    	alert('Select mentioned Seats');
		    }
		}else{
			 alert('Enter Name and Seat limit');
		}
    });

});

/* Updating user info*/
function updateUserlist() {
    var allUser = localStorage.getItem('userinfo');
    var demoTemplate = _.template($('#tableTmplate').html());
    var dataArray = JSON.parse(allUser)
    $('#userlist').empty();
    if (dataArray != null) {
        var newhtml = demoTemplate({'dataArray': dataArray});
        $('#userlist').append(newhtml);
    }
}
