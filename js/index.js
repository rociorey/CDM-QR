(function($){
    $.fn.extend({
        donetyping: function(callback, timeout){
            timeout = timeout || 500;
            var timeoutReference,
                doneTyping = function(el){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i, el){
                var $el = $(el);
                $el.is(':input') && $el.on('keyup keypress', function(e){
                    if (e.type == 'keyup' && e.keyCode != 8) return;
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){
                        doneTyping(el);
                    }, timeout);
                }).on('blur', function(){
                    doneTyping(el);
                });
            }).add(this.filter(':input')); // Include dynamically added inputs
        }
    });
})(jQuery);

var formValidation = {
    init: function(){
        this.$form = $('.registration-form');
        this.$firstName = this.$form.find('input[name="firstName"]');
        this.$lastName = this.$form.find('input[name="lastName"]');
        this.$email = this.$form.find('input[name="email"]');
        this.$password = this.$form.find('input[name="password"]');
        this.$passwordToggle = this.$form.find('button.toggle-visibility');
        this.$submitButton = this.$form.find('button.submit');
        this.$durationSelect = this.$form.find('#duration-select');
        this.$outfitActivitiesContainer = this.$form.find('#outfit-activities-container');
        
        this.validatedFields = {
            firstName: false,
            lastName: false,
            email: false,
            password: false
        };
        
        this.bindEvents();
    },
    bindEvents: function(){
        var self = this;
        // this.$firstName.donetyping(function(){
        //     self.validateFirstNameHandler();
        // });
        // this.$lastName.donetyping(function(){
        //     self.validateLastNameHandler();
        // });
        // this.$email.donetyping(function(){
        //     self.validateEmailHandler();
        // });
        // this.$password.donetyping(function(){
        //     self.validatePasswordHandler();
        // });
        // this.$passwordToggle.mousedown(function(){
        //     self.togglePasswordVisibilityHandler();
        // });
        // this.$passwordToggle.click(function(e){
        //     e.preventDefault();
        // });
        this.$form.submit(function(e){
            e.preventDefault();
            self.submitFormHandler();
        });
        this.$durationSelect.on('change', function(){
            self.handleDurationChange();
        });
    },
    // validateFirstNameHandler: function(){
    //     this.validatedFields.firstName = this.validateText(this.$firstName);
    // },
    // validateLastNameHandler: function(){
    //     this.validatedFields.lastName = this.validateText(this.$lastName);
    // },
    // validateEmailHandler: function(){
    //     this.validatedFields.email = this.validateText(this.$email) && this.validateEmail(this.$email);
    // },
    // validatePasswordHandler: function(){
    //     this.validatedFields.password = this.validateText(this.$password) && this.validatePassword(this.$password);
    // },
    // togglePasswordVisibilityHandler: function(){
    //     var html = '<input type="text" value="'+this.$password.val()+'">';
    //     var $passwordParent = this.$password.parent();
    //     var saved$password = this.$password.detach();
    //     $passwordParent.append(html);
    //     this.$passwordToggle.find('span').removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
    //     this.$passwordToggle.one('mouseup mouseleave', function(){
    //         $passwordParent.find('input').remove();
    //         $passwordParent.append(saved$password);
    //         self.$passwordToggle.find('span').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
    //     });
    // },

	  submitFormHandler: function(e) {
		if (e) {
		  e.preventDefault();
		}
	  
		// Create the new HTML page content
		var newPageContent =
		  '<html>' +
		  '<head>' +
		  '<title>Submitted Form</title>' +
		  '<link rel="stylesheet" type="text/css" href="css/style.css">' +
		  '</head>' +
		  '<body>' +
		  '<h1>Submitted Form</h1>' +
		  '<p>Bride To Be: ' + this.$firstName.val() + '</p>' +
		  '<p>Hen Do Start Date & Time: ' + this.$lastName.val() + '</p>' +
		//   '<p> Hen Do Duration: ' + this.$options.val() + '</p>' +
		//   '<p>Outfit Day 1: ' + this.$outfit1.val() + '</p>' +
		//   '<p>Activities Day 1: ' + this.$activities1.val() + '</p>' +
		  '</body>' +
		  '</html>';
	  
		// Create a Blob object with the new page content
		var blob = new Blob([newPageContent], { type: 'text/html' });
	  
		// Generate a URL for the Blob object
		var url = 'https://www.coco-de-mer.com/';
	  
		// Open the new page in the same URL with an additional identifier
		window.location.href = url;
        console.log(window.location.href)
	  },
	  
	  
	  
	  
    handleDurationChange: function(){
        var duration = this.$durationSelect.val();
        var container = this.$outfitActivitiesContainer;
        
        container.removeClass('open');
        container.empty();
        
        for (var i = 1; i <= duration; i++) {
            var outfitLabel = $('<label>').addClass('col-one-half');
            outfitLabel.append($('<span>').addClass('label-text').text('Outfit Day ' + i));
            outfitLabel.append($('<input>').attr('type', 'text').attr('name', 'outfit' + i));
            
            var activitiesLabel = $('<label>').addClass('col-one-half');
            activitiesLabel.append($('<span>').addClass('label-text').text('Activities Day ' + i));
            activitiesLabel.append($('<input>').attr('type', 'text').attr('name', 'activities' + i));
            
            container.append(outfitLabel).append(activitiesLabel);
        }
    },
    // validateText: function($input){
    //     $input.parent().removeClass('invalid');
    //     $input.parent().find('span.label-text small.error').remove();
    //     if($input.val() !== ''){
    //         return true;
    //     }else{
    //         $input.parent().addClass('invalid');
    //         $input.parent().find('span.label-text').append(' <small class="error">(Field is empty)</small>');
    //         return false;
    //     }
    // },
    // validateEmail: function($input){
    //     var regEx = /\S+@\S+\.\S+/;
    //     $input.parent().removeClass('invalid');
    //     $input.parent().find('span.label-text small.error').remove();
    //     if(regEx.test($input.val())){
    //         return true;
    //     }else{
    //         $input.parent().addClass('invalid');
    //         $input.parent().find('span.label-text').append(' <small class="error">(Email is invalid)</small>');
    //         return false;
    //     }
    // },
    // validatePassword: function($input){
    //     $input.parent().removeClass('invalid');
    //     $input.parent().find('span.label-text small.error').remove();
    //     if($input.val().length >= 8){
    //         return true;
    //     }else{
    //         $input.parent().addClass('invalid');
    //         $input.parent().find('span.label-text').append(' <small class="error">(Your password must be longer than 7 characters)</small>');
    //         return false;
    //     }
    // }
};

formValidation.init();
