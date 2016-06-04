/**
 * ElementInfoBase.
 * 描画情報基底クラス
 * @param 
 * @return
 */

/* 形状種別 */
SHAPE_TYPE = {
 SHAPE_TYPE_INVALID		:-1,	//-1:不正な形状
 SHAPE_TYPE_POLYLINE	: 0,	// 0:ポリライン
 SHAPE_TYPE_POLYGON		: 1,	// 1:ポリゴン
 SHAPE_TYPE_TEXT		: 2,	// 2:テキスト
 NUM_SHAPE_TYPE			: 3		//  :形状種別数
};

/* メンバ変数 */
function ElementInfoBase(){
	this.m_position		= [ 0, 0, 0];						//始点座標
	this.m_rect			= [ 0, 0, 0, 0];					//存在領域矩形
	this.m_color		= 0xff0000;							//色
	this.m_shapeType	= SHAPE_TYPE.SHAPE_TYPE_INVALID;	//形状種別
};

//始点座標の設定
ElementInfoBase.prototype.setPosition = function(position){
	for(var i=0;i<3;i++){ this.m_position[i] = position[i];	}
};
//始点座標の取得
ElementInfoBase.prototype.getPosition = function(){
	return this.m_position;
};

//存在領域矩形の設定
ElementInfoBase.prototype.setRect = function(rect){
	for(var i=0;i<4;i++){ this.m_rect[i] = rect[i];	}
};
//存在領域矩形の取得
ElementInfoBase.prototype.getRect = function(){
	return this.m_rect;
};

//色情報の設定
ElementInfoBase.prototype.setColor = function(color){
	this.m_color = color;
};
//色情報の取得
ElementInfoBase.prototype.getColor = function(){
	return this.m_color;
};

//形状種別の設定
ElementInfoBase.prototype.setshapeType = function(type){
	this.m_shapeType = type;
};
//形状種別の取得
ElementInfoBase.prototype.getShapeType = function(){
	return this.m_shapeType;
};