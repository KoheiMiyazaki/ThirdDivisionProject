/**
 * Util.
 * ユーティリティクラス
 * @param 
 * @return
 */

/* エラーコード */
const ERROR_CODE = {
	ERROR_CODE_SUCCESS	:  0,	// 0:成功
	ERROR_CODE_INVALID	: -1,	//-1:不正値
	ERROR_CODE_FAILD	: -2,	//-2:失敗
	NUM_ERROR_CODE		:  2	//  :エラーコード数
};

/**
 * getWindowSize.
 * ブラウザのウィンドウサイズを返却
 * @param 
 * @return
 */
function getWindowSize(){
	var result = [0,0];
	result[0] = window.innerWidth;
	result[1] = window.innerHeight;	
}