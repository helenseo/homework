
/***
 * @name item
 * @example
  item(sku, name, price, quantity)
 * @params {string} sku ��Ʒ�ı�ʾ
 * @params {string} name ��Ʒ������
 * @param {number} price ��Ʒ�ļ۸�
 * @param {number} quantity ��Ʒ������
 */
function item(sku, name, price, quantity){
  this.sku = sku;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
}
 
var shopCart = function(window){
 
  "use strict";
  //ȫ�ֱ���
  // note new new Date("2020-12-23") ��ie���汨����֧���������﷨
  var items = [],cartName='kuaidian_shop_cart',expires = new Date( new Date().getTime()+86400000*30 )
  ,debug = true,decimal = 2;
  var options = {
    'cartName' : cartName, //cookie������
    'expires' : expires, //cookieʧЧ��ʱ��
    'debug' : debug, //�Ƿ��ӡ������Ϣ
    'decimal' : decimal, //Ǯ�ľ�ȷ��С������λ��
    'callback' : undefined
  };
 
 
  //��¶���ⲿ�Ľӿڷ���
  return {
    inited : false,
    init: function(option){
      //�ж��û��Ƿ����cookie
      if(!window.navigator.cookieEnabled ){
        alert('�����������֧��cookie�޷�ʹ�ù��ﳵ��,��������������cookie��');
        return false;
      }
      //��cookie�л�ȡ���ﳵ�е�����
      this.inited = true;
      if(option){
        extend(options,option);
      }
      var cookie = getCookie(options.cartName);
      if(typeof cookie === 'undefined'){
        setCookie(options.cartName,'',options.expires);
      }else{
        //ÿ��item֮����&�ֿ���item������֮����|�ָ�
        var cookie = getCookie(options.cartName);
        if(cookie){
          var cItems = cookie.split('&');
          for(var i=0,l=cItems.length;i<l;i++){
            var cItem = cItems[i].split('|');
              var item = {};
              item.sku = cItem[0] || '';
              item.name = cItem[1] || '';
              item.price = cItem[2] || '';
              item.quantity = cItem[3] || '';
              items.push(item);
          };
        };
 
      };
    },
    findItem: function(sku){//����sku��ʾ������Ʒ
      //���ľ���ṩsku,�򷵻����е�item
      if(sku){
        for(var i=0,l=items.length;i<l;i++){
          var item = items[i];
          if(item.sku === sku){
            return item;
          }
        }
        return undefined;
      }else{
        return items;
      }
 
    },
    getItemIndex : function(sku){ //��ȡitem��items�������±�
      for(var i=0,l=items.length;i<l;i++){
        var item = items[i];
        if(item.sku == sku){
          return i;
        }
      }
      //ľ���ҵ�����-1
      return -1;
    },
    addItem: function(item){ //����һ������Ʒ�����ﳵ
      //���һ����Ʒ
      if(this.findItem(item.sku)){
        if(options.debug){
          _log('��Ʒ�Ѿ�������');
          return false;
        }
      }
      items.push(item);
      _saveCookie();
      return true;
    },
    delItem: function(sku){ //�ӹ��ﳵ��ɾ��һ����Ʒ
      //ɾ��һ����Ʒ
      var index = this.getItemIndex(sku);
      if(index > -1){
        items.splice(index,1);
        _saveCookie();
      }else{
        if(options.debug){
          _log('��Ʒ������');
          return false;
        }
      }
    },
    updateQuantity: function(item){ //������Ʒ������
      //����һ����Ʒ
      var index = this.getItemIndex(item.sku);
      if(index > -1){
        items[index].quantity = item.quantity;
        _saveCookie();
      }else{
        if(options.debug){
          _log('��Ʒ������');
          return false;
        }
      }
    },
    emptyCart: function(){
      //�������
      items.length = 0;
      _saveCookie();
    },
    checkout: function(){
      //��������Ļص�����
      if(options.callback){
        options.callback();
      }
    },
    getTotalCount: function(sku){
      //��ȡ���ﳵ��Ʒ�������������ĳ����Ʒ��id����ô�ͷ��ظ���Ʒ������
      var totalCount = 0;
      if(sku){
        totalCount = (typeof this.findItem(sku) === 'undefined' ? 0 : this.findItem(sku).quantity );
      }else{
        for(var i=0,l=items.length;i<l;i++){
          totalCount += (parseInt(items[i].quantity) === 'NaN' ? 0 : parseInt(items[i].quantity )) ;
        }
      }
      return totalCount;
    },
    getTotalPrice : function(sku){
      //��ȡ���ﳵ��Ʒ���ܼ۸� ,�����ĳ����Ʒ��id����ô�ͷ��ظ���Ʒ���ܼ۸�
      var totalPrice = 0.0;
      if(sku){
        var num = parseInt((typeof this.findItem(sku) === 'undefined' ? 0 : this.findItem(sku).quantity )),
        price = parseFloat((typeof this.findItem(sku) === 'undefined' ? 0 : this.findItem(sku).price ));
        num = num=== 'NaN' ? 0 : num;
        price = price === 'NaN' ? 0 : price;
        totalPrice = price * num;
      }else{
        for(var i=0,l=items.length;i<l;i++){
          totalPrice += (parseFloat(items[i].price ) * parseInt(items[i].quantity));
        }
      }
      return totalPrice.toFixed(options.decimal);
    },
    getCookie : getCookie,
    setCookie : setCookie
  };
 
 
  /**
   * ����cookie
   * @name setCookie
   * @example
    setCookie(name, value[, options])
   * @params {string} name ��Ҫ����Cookie�ļ���
   * @params {string} value ��Ҫ����Cookie��ֵ
   * @params {string} [path] cookie·��
   * @params {Date} [expires] cookie����ʱ��
   */
  function setCookie(name, value, options) {
    options = options || {};
    var expires = options.expires || null;
    var path = options.path || "/";
    var domain = options.domain || document.domain;
    var secure = options.secure || null;
    /**
    document.cookie = name + "=" + escape(value)
    + ((expires) ? "; expires=" + expires.toGMTString() : "")
    + "; path=" + path
    + "; domain=" + domain ;
    + ((secure) ? "; secure" : "");
    */
    var str = name + "=" + encodeURIComponent(value)
    + ((expires) ? "; expires=" + expires.toGMTString() : "")
    + "; path=/";
    document.cookie = str;
  };
 
  /**
   * ��ȡcookie��ֵ
   * @name getCookie
   * @example
    getCookie(name)
   * @param {string} name ��Ҫ��ȡCookie�ļ���
   * @return {string|null} ��ȡ��Cookieֵ����ȡ����ʱ����null
   */
  function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name
        + "=([^;]*)(;|$)"));
    if (arr != null) {
      return decodeURIComponent(arr[2]);
    }
    return undefined;
  };
 
  //***********************˽�з���********************/
  function _saveCookie(){
    var i=0,l=items.length;
    if(l>0){
      var tItems = [];
      for(;i<l;i++){
        var item = items[i];
        tItems[i] = item.sku + '|' +item.name + '|' + item.price + '|' + item.quantity;
      };
      var str = tItems.join('&');
      setCookie(options.cartName, str, {expires:options.expires});
    }else{
      setCookie(options.cartName, '', {expires:options.expires});
    }
 
  };
 
  //***********************���߷���********************/
  //��ʾ������Ϣ
  function _log(info){
    if(typeof console != 'undefined'){
      console.log(info);
    }
  };
  //�̳�����
  function extend(destination, source) {
    for ( var property in source) {
      destination[property] = source[property];
    }
  };
}(typeof window === 'undifined' ? this: window);
