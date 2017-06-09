var MyValidator = function() {  
    var handleSubmit = function() {  
        $('.form-horizontal').validate({  
            errorElement : 'span',  
            errorClass : 'help-block',  
            focusInvalid : false,  
            rules : {  
                subject : {  
                    required : true  
                },
                ruleTmeplate : {  
                    required : true  
                },
                ruleDesc : {  
                    required : true  
                },
                appCod : {  
                    required : true  
                },
                appMod : {  
                    required : true  
                },
                priority : {  
                    required : true  
                },
                almChl : {  
                    required : true  
                },
                groupName : {  
                    required : true  
                },
                dayTimeWindow : {  
                    required : true  
                },
                dayThreSholdPercent : {  
                    required : true  
                },
                dayThreSholdNum : {  
                    required : true  
                },
                tolerate : {  
                    required : true  
                },
                isIp : {  
                    required : true  
                }
            },  
            messages : {  
                subject : {  
                    required : "subject subject is required."  
                },
                ruleTmeplate : {  
                    required : "ruleTmeplate subject is required."  
                },
                ruleDesc : {  
                    required : "ruleDesc subject is required."  
                },
                appCod : {  
                    required : "appCod subject is required."  
                },
                appMod : {  
                    required : "appMod subject is required."  
                },
                priority : {  
                    required : "priority subject is required."  
                },
                almChl : {  
                    required : "almChl subject is required."  
                },
                groupName : {  
                    required : "groupName subject is required."  
                },
                dayTimeWindow : {  
                    required : "dayTimeWindow subject is required."  
                },
                dayThreSholdPercent : {  
                    required : "dayThreSholdPercent subject is required."  
                },
                dayThreSholdNum : {  
                    required : "dayThreSholdNum subject is required."  
                },
                tolerate : {  
                    required : "tolerate subject is required."  
                },
                isIp : {  
                    required : "isIp subject is required."  
                }
            },  
  
            highlight : function(element) {  
                $(element).closest('.form-group').addClass('has-error');  
            },  
  
            success : function(label) {  
                label.closest('.form-group').removeClass('has-error');  
                label.remove();  
            },  
  
            errorPlacement : function(error, element) {  
                element.parent('div').append(error);  
            },  
  
            submitHandler : function(form) {  
                form.submit();  
            }  
        });  
  
        $('.form-horizontal input').keypress(function(e) {  
            if (e.which == 13) {  
                if ($('.form-horizontal').validate().form()) {  
                    $('.form-horizontal').submit();  
                }  
                return false;  
            }  
        });  
    }  
    return {  
        init : function() {  
            handleSubmit();  
        }  
    };  
  
}();  