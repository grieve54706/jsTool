
'use strict';

var SignupTool = {

	loadAddress: function(completeAddress) {
		var county,
			district,
			zipCode,
			address;

		if (completeAddress) {
			zipCode = completeAddress.split(" ")[0];
			address = completeAddress.split(" ")[1];
			county = address.substring(0, 3);
			district = address.substring(3, 6);
			address = address.replace(county, '').replace(district, '');
		}

		$('#twzipcode').twzipcode('destroy');

		$('#twzipcode').twzipcode({
			'countyName': 'county',
			'districtName': 'district',
			'zipcodeName': 'zipCode',
			'countySel': county,
			'districtSel': district,
			'zipcodeSel': zipCode
		});

		$('[name="address"]').val(address);
	},

	buildAddress: function() {
		var completeAddress = $('[name="zipCode"]').val() + " " + $('[name="county"]').val() + $('[name="district"]').val() + $('[name="address"]').val();
		$('[name*=".address"]').val(completeAddress);
	},

	showHidePlusitemGift: function(self) {
		var $applyItemInputList = $(self).find('input[name*=".item"]:checked'),
			checkedItemList = [],
			plusitemsitemseqno,
			giftItemsno,
			isInList;

		$applyItemInputList.each(function() {
			checkedItemList.push($(this).val());
		});

		$('[name="plusitemsSpan"]').each(function() {
			plusitemsitemseqno = $(this).attr('plusitemsitemseqno');

			isInList = checkedItemList.indexOf(plusitemsitemseqno);

			if (plusitemsitemseqno && isInList < 0) {
				var $input = $(this).find('input');

				$input.val('');
				$input.change();

				$(this).find('select').each(function(index, el) {
					el.selectedIndex = 0;
				});

				$(this).hide();
			}
		});

		$('[name="giftSpan"]').each(function() {
			giftItemsno = $(this).attr('giftItemsno');

			isInList = checkedItemList.indexOf(giftItemsno);

			if (giftItemsno && isInList < 0) {
				var $input = $(this).find('input');

				$input.val('');
				$input.change();

				$(this).find('select').each(function(index, el) {
					el.selectedIndex = 0;
				});

				$(this).hide();
			}
		});

		for (var i = 0; i < checkedItemList.length; i++) {
			$('#plusitems_itemseqno_' + checkedItemList[i]).show();
			$('#gift_itemsno_' + checkedItemList[i]).show();
		}
	},

	calPrice: function(obj, unitPrice, index) {
		var reg = /^[0-9]*$/,
			amount = $(obj).find('.number').val();

		if (reg.test(amount)) $("#price_" + index).text(amount * unitPrice);
	},

	loadApplyItem: function(value) {
		var itemsnoArray = this.splitItemsno(value),
			$itemsList = $('[name*=".items"]');

		if ($itemsList) {
			$itemsList.each(function(index, itemsElement) {
				$(itemsnoArray).each(function(index, itemsno) {
					if (itemsElement.value === itemsno)
						$(itemsnoList[index]).checkBtn();
				});
			});
		}
	},

	loadSex: function(value) {
		$('[name*=".sex"]').each(function() {
			if ($(this).val() === value) $(this).checkBtn();
		});
	},

	loadAttendeeSex: function(value) {
		$('[name*=".attendeeSex"]').each(function() {
			if ($(this).val() === value) $(this).checkBtn();
		});
	},

	loadMarriedstatus: function(value) {
		$('[name*=".marriedstatus"]').each(function() {
			if ($(this).val() === value) $(this).checkBtn();
		});
	},

	loadInvoice: function(invoicingtype, donationOrg) {
		$('[name*=".joinactivity.invoicingtype"]').each(function() {
			if ($(this).val() === invoicingtype) $(this).checkBtn();
		});
		$('#' + invoicingtype + 'Item').addClass('open');
		$('[name*=".joinactivity.donationOrg"]').each(function() {
			if ($(this).val() === donationOrg) $(this).checkBtn();
		});
	},

	loadPayWay: function(value) {
		$('[name*=".joinactivity.paytype"]').each(function() {
			if ($(this).val() === value) $(this).checkBtn();
		});
	},

	setTwzipcode: function(county, district, zipCode) {
		$('#twzipcode').twzipcode('set', {
	    	'county': county,
	    	'district': district,
	    	'zipCode': zipCode
		});
	},

	splitItemsno: function(itemsno) {
		if (itemsno) {
			return itemsno.split(';;');
		}
		return '';
	}
}