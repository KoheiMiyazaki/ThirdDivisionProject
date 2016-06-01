/**
 * DrawModelBase.
 * 描画モデル基底クラス
 * @param 
 * @return
 */

/* メンバ変数 */
function DrawModelBase(){
	this.m_isAddScene		= false;	//既にシーンに追加されたかどうかを保持するフラグ
};

//シーン追加フラグの設定
DrawModelBase.prototype.setIsAddScene = function(fl){
	this.m_isAddScene = fl;
};
//シーン追加フラグの取得
DrawModelBase.prototype.getIsAddScene = function(){
	return this.m_isAddScene;
};