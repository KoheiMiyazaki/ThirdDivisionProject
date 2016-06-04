/**
 * DrawModelBase.
 * 描画モデル基底クラス
 * @param 
 * @return
 */

/* メンバ変数 */
function DrawModelBase(){
	this.m_drawModel		= null;		//描画モデル
	this.m_isAddScene		= false;	//既にシーンに追加されたかどうかを保持するフラグ
};

//描画モデルの設定
DrawModelBase.prototype.setDrawElement = function(model){
	this.m_drawModel = model;
};
//描画モデルの取得
DrawModelBase.prototype.getDrawElement = function(){
	return this.m_drawModel;
};

//シーン追加フラグの設定
DrawModelBase.prototype.setIsAddScene = function(fl){
	this.m_isAddScene = fl;
};
//シーン追加フラグの取得
DrawModelBase.prototype.getIsAddScene = function(){
	return this.m_isAddScene;
};