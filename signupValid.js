function setFormValid(form) {
	addValidMethod();
	setValidate(form);
}

function setValidate(form) {
	$(form).validate({
		ignore: [],
		errorClass: 'errorBorder',
		errorElement: 'span',
		onkeyup: false,
		errorPlacement: function($label, $element) {
			$label.addClass('label-important');
			$label.insertAfter($element);
		}
	});

	$('[name*=".item"]').rules('add', {required: true, itemsnoValid: true, isMemOdrValid: true});
	$('[name*=".name"]').rules('add', {required: true, maxlength: 128});
	$('[name*=".mobile"]').rules('add', {required: true, mobileValid: true});
	$('[name*="email"]').rules('add', {required: true});
	$('[name*=".pid"]').rules('add', 	{required: true, minlength: 10});
	$('[name*=".dayphone"]').rules('add', {required: true});
	$('[name*=".nationality"]').rules('add', {required: true});
	$('[name="county"]').rules('add', {required: true});
	$('[name="district"]').rules('add', {required: true});
	$('[name="zipCode"]').rules('add', {required: true});
	$('[name="address"]').rules('add', {required: true, addressValid: true});
	$('[name*=".address"]').rules('add', {required: true});
	$('[name*=".birthday"]').rules('add', {required: true, birthdayValid: true});
	$('[name*=".sex"]').rules('add', {required: true});
	$('[name*=".paytype"]').rules('add', {required: true, paytypeValid: true});
	$('[name*=".invoicingtype"]').rules('add', {required: true, invoiceTypeValid: true});
	$('[name*=".endtime"]').rules('add', {required: true});

	jQuery.extend(jQuery.validator.messages, {
		required: "必需輸入",
	});
}

function addValidMethod() {

	jQuery.validator.addMethod("birthdayValid", function(value, element) {
		return validBirthdayVal(element);
	}, "請輸入正確的出生年月日");

	jQuery.validator.addMethod("itemsnoValid", function(value, element) {
		var $itemsLit = $('[name*=".item"]:checked'),
			hasItems = $itemsLit.length > 0,
			itemsno = '';

		if (hasItems) {
			$itemsLit.each(function() {
				itemsno += this.value + ';;';
			});
			$itemsLit.val(itemsno);
			return true;
		} else {
			return false;
		}
	}, '請至少選擇一個場次');

	jQuery.validator.addMethod("isMemOdrValid", function(value, element) {
		var isSubscriberonly = $(element).attr('isSubscriberonly');

		if (isSubscriberonly === '1') {
			if ($('[name="people.isMemOdr"]').val() === 'true')
				return true;
			else
				return false;
		} else {
			return true;
		}
	}, '此活動訂戶限定');

	jQuery.validator.addMethod("mobileValid", function(value, element) {
		var tel = /^(\+|09)\d{8,15}$/;
		return tel.test(value);
	}, "請輸入正確手機格式 : 09或+國碼 開頭(限15字元)");

	jQuery.validator.addMethod("invoiceTypeValid", function(value, element) {
		var isOK = true;

		switch (value) {
			case 'digit':
				if (!$('[name*="joinactivity.invoicingbuyer"]').val()) isOK = false;
				break;
			case 'donate':
				if ($('[name*="joinactivity.donationOrg"]:checked').length == 0) isOK = false;
				break;
			case 'three':
				$('[name="threeInputArea"] input').each(function() {
					if (!$(this).val()) isOK = false;
				});
				break;
		}
		return isOK;
	}, "請輸入選擇並輸入正確的發票資訊");

	jQuery.validator.addMethod("paytypeValid", function(value, element) {
		if (element) {
			$(element).parent().find('[name="paymentWay"]').val(value);
			return true;
		} else {
			return false;
		}
	}, "請輸入選擇繳費方式");

	jQuery.validator.addMethod("addressValid", function(value, element) {
		if (value) {
			SignupTool.buildAddress($('[name*=".address"]'));
			return true;
		} else {
			return false;
		}
	}, "請輸入正確地址資訊");
}

function setErrorSpan2EventType($label, $element) {
	var $eventType = $element.parent().parent().parent().parent().find('.eventType');
	$eventType.html($eventType.text() + $label[0].outerHTML);
}