/**
 * TextElementInfo.
 * テキスト形状クラス
 * @param 
 * @return
 */

/* メンバ変数 */
function TextElementInfo(){
	this.m_fontSize	= 0;
	this.m_fontType	= "";
	this.m_textRext	= [ 0, 0, 0, 0, 0, 0, 0, 0];
	ElementInfoBase.apply(this,arguments);		//DrawModelBaseを継承するための記述1
};
TextElementInfo.prototype = new ElementInfoBase;	//DrawModelBaseを継承するための記述2

/**
 * createElement.
 * 描画エレメントの作成
 * @param	textElementInfoArr	:テキスト形状描画情報配列
 * @return
 */	
 TextElementInfo.prototype.createElement = function( textElementInfoArr ){
	return ERROR_CODE_SUCCESS;
};