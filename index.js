module.exports = function tikatpreview(mod) {
	
	mod.dispatch.addOpcode('S_PREVIEW_ITEM',   59553)
	
	let tikatshop = false;
	let prev = null;

	mod.hook('S_REQUEST_CONTRACT', 1, event => {
		if (event.type == 63) tikatshop = true
	})
	
	mod.hook('S_CANCEL_CONTRACT', 1, event => {
		if (event.type == 63) tikatshop = false
	})
	
	mod.hook('S_REPLY_NONDB_ITEM_INFO', 1, event => {
		if(!tikatshop) return
		if(event.unk != 1) return
		if(event.item == prev) dopreview(prev)
		prev = event.item
	})
	
	function dopreview(itemid){
		mod.send('S_PREVIEW_ITEM', 1, {
			items: [{
				uid: "0",
				item: itemid,
				model: 0,
				dye: 0,
				text: ""
			}]
		})
		prev = null
	}
}
