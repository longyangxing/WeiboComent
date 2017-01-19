window.onload = function (){
	//获取box评论块
	var list = document.getElementById('list');
	var boxs = list.children;

	//输出时间格式函数
	 function formateDate(date) {
         var y = date.getFullYear();
         var m = date.getMonth() + 1;
         var d = date.getDate();
         var h = date.getHours();
         var mi = date.getMinutes();
         m = m > 9 ? m : '0' + m;
         d = d > 9 ? d : '0' + d;
         h = h > 9 ? h : '0' + h;
         mi = mi > 9 ? mi : '0' + mi;
         return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
     }
	//删除节点函数
	function remove(target){
		target.parentNode.removeChild(target);
	}
	//点赞动态处理函数
	function praiseBox(target){
		//praise内容

		var p_con = target.innerHTML;
		//获取父节点con
		var con = target.parentNode.parentNode;
		//获取节点pt
		var praise_total = con.getElementsByClassName('praise-total')[0];

		var total = parseInt( praise_total.getAttribute('total') );
		if( p_con == '赞'){
			total += 1;
			praise_total.setAttribute('total',total);
			target.innerHTML = '取消赞';
			praise_total.innerHTML = total > 1 ? '我和'+(total-1)+'个人觉得很赞':'我觉得很赞';
		}else{
			total -= 1;
			praise_total.setAttribute('total',total);
			target.innerHTML = '赞';
			praise_total.innerHTML = total +'个人觉得很赞';
		}
		praise_total.style.display = ( total > 0 ) ? '' : 'none';
	}
	// 回复点赞处理函数
	function praiseReply(target){
		var my = target.getAttribute('my');

		var total = parseInt( target.getAttribute('total') ); 
		if( my == 0 ){
			total += 1;
			target.setAttribute('total',total);
			target.setAttribute('my',1);
			target.innerHTML = total + '取消赞';
		}else{
			total -= 1;
			target.setAttribute('total',total);
			target.setAttribute('my',0);
			target.innerHTML = total + '赞';
		}
		target.style.display = total > 0 ? 'inline-block' : '';
	}
	//回复操作函数
	function operateReply(target){
		//获取comment-box
		var comment_box = target.parentNode.parentNode.parentNode;
		//获取com-list
		var comment_list = comment_box.parentNode;
		//content
		var con = comment_list.parentNode;
		//text-box
		var user = comment_box.getElementsByClassName('user')[0].innerHTML;
		var text_box = con.getElementsByClassName('text-box')[0];
		if( target.innerHTML == '删除'){
			comment_list.removeChild(comment_box);
		}else{
			text_box.children[0].innerHTML = '@' + user+ ':';
			text_box.children[0].onkeyup();
			text_box.children[0].onfocus();
		}
	}
	//回复评论处理函数
	function reply(target){
		var reply_con = target.parentNode.children[0].value;
		var comment_list = target.parentNode.parentNode.getElementsByClassName('comment-list')[0];
		var comment_box = document.createElement('div');
		comment_box.className = 'comment-box';
		comment_box.setAttribute('user','self');
		comment_box.innerHTML = '<img src="images/my.jpg" class="myhead">'+
						'<div class="comment-content">'+
							'<p class="commet-text">'+
								'<span class="user">我:</span>'+
								reply_con +
							'</p>'+
							'<p class="commet-time">'+
								formateDate(new Date())+
								'<a href="javascript:void(0);" class="comment-praise"total="1" my="0" style="display: inline-block;">1赞</a>'+
								'<a href="javascript:void(0);" class="comment-operate"+>删除</a>'+
							'</p>'+
						'</div>';
		comment_list.appendChild(comment_box);
		target.parentNode.children[0].value = '';
		target.parentNode.children[2].innerHTML = '0/160';				

	}

	//事件委托处理点击事件
	for( var i = 0; i < boxs.length; i++){
		boxs[i].onclick = function(event){
			var event = event || window.event;
			var target = event.target || event.srcElement;
			switch( target.className ){
				case 'close':
					remove(this);
					break;
				case 'praise':
					praiseBox(target);
					break;
				case 'comment-praise':
					praiseReply(target);
					break;
				case 'comment-operate':
					operateReply(target);
					break;
				case 'btn':
					reply(target);
					break;
				default:
					break;
			}
		}
		var textArea = boxs[i].getElementsByClassName('comment')[0];
		textArea.onfocus = function (){
			this.parentNode.className = 'text-box text-box-on';
		}
		textArea.onblur = function(){

			if( this.value.length === 0){

				this.parentNode.className = 'text-box';
			}
		}
		textArea.onkeyup = function(){
			var btn = this.parentNode.children[1];
			var word = this.parentNode.children[2];
			if( this.value.length == 0 || this.value.length >160 ){
				btn.className = 'btn btn-off'
			}else{
				btn.className = 'btn'
				word.innerHTML = this.value.length +'/160';
			}
		}
	}
}