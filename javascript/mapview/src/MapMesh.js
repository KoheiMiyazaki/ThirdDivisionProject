/**
 * MapMesh.
 * 地図メッシュクラス
 * @param 
 * @return
 */

/* メンバ変数 */
function MapMesh(){
	this.m_meshNum		= new Array(2);	//地図メッシュ番号
	this.m_rect			= new Array(4);	//存在領域矩形
	this.m_drawModel	= null;			//描画モデル
};

/* 単純なセッタ・ゲッタ */
//描画モデルの設定
MapMesh.prototype.setDrawModel = function(drawModel){
	this.m_drawModel = drawModel;
};
//描画モデルの取得
MapMesh.prototype.getDrawModel = function(){
	return this.m_drawModel;
};

/**
 * createElementInfoArr.
 * 描画情報の作成
 * @param
 * @return
 */	
MapMesh.prototype.createElementInfoArr = function(){
};