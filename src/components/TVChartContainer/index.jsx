import * as React from 'react';
import './index.css';
import Datafeed from './api/'


function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export class TVChartContainer extends React.PureComponent {

	static defaultProps = {
		symbol: 'Coinbase:BTC/USD',
		interval: '15',
		timeframe: '1d',
		containerId: 'tv_chart_container',
		libraryPath: '/charting_library/',
		timezone: 'Asia/Hong_Kong',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	};

	componentDidMount() {
		/**
		 * https://github.com/tradingview/charting_library/wiki/Widget-Constructor
		 */
		const widgetOptions = {
			/**
			 * Debug Mode: write details in browser console
			 */
			debug: true,
			symbol: this.props.symbol,

			/**
			 * JS API
			 */
			datafeed: Datafeed,

			/**
			 * The time period of one bar
			 * Exps
			 *   Seconds: <xS> ('1S', '15S', ...)
			 *   Minutes: <x> ('1', '15', '30', ...)
			 *   Hours: <using minutes> ('60', '120', '240', ...)
			 *   Days: <xD> ('1D', '2D', ...)
			 *   Weeks: <xW> ('1W', '2W', ...)
			 *   Monthes: <xM> ('1M', '2M', ...)
			 *   Years: <using monthes> ('12M', '24M', ...)
			 */
			interval: this.props.interval,

			/**
			 * The period of bars that will be loaded and shown on the screen
			 * Valid timeframe is a number with a letter D for days and M for months.
			 */
			timeframe: this.props.timeframe,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,

			// Read /docs/localization
			locale: getLanguageFromURL() || 'en',

			/**
			 * Default 'Etc/UTC'
			 * Read Supported Timezones in /docs/supported_timezones 
			 */
			timezone: this.props.timezone,

			// Toolbar background，工具栏背景色
			// toolbar_bg: '#eee',

			// Maximum amount of studies to display, minimum is 2
			// 如果设限，选择超过上限会有弹窗提示
			// study_count_limit: 3,

			/**
			 * 技术指标选项配置
			 * Studies Black/White List
			 * grayed: 显示出来，但是变灰
			 */
			// studies_access: {
			// 	type: 'white',
			// 	tools: [
			// 		{
			// 			name: 'MACD',
			// 			grayed: false,
			// 		},
			// 		{
			// 			name: 'Bollinger Bands',
			// 			grayed: false
			// 		},
			// 		{
			// 			name: 'Moving Average Exponential',
			// 			grayed: false
			// 		},
			// 		{
			// 			name: 'Moving Average',
			// 			grayed: false
			// 		}
			// 	]
			// },

			/**
			 * 绘图工具选项配置，黑/白名单
			 */
			// drawings_access: {
			// 	type: 'black',
			// 	tools: [
			// 		{
			// 			name: 'XABCD Pattern'
			// 		}
			// 	]
			// },

			// 只支持数字小数点格式修改
			numeric_formatting: {decimal_sign: '.'},
      // Date & Time formate
			customFormatters: {
				timeFormatter: {
					format: (date) => {
						const _format_str = '%h:%m'
						return _format_str.replace('%h', date.getUTCHours(), 2)
															.replace('%m', date.getUTCMinutes(), 2)
															.replace('%s', date.getUTCSeconds(), 2)
					}
				},
				dateFormatter: {
					format: (date) => (
						date.getUTCFullYear() + '/' + date.getUTCMonth() + '/' + date.getUTCDate()
					)
				}
			},
			
			/**
			 * https://github.com/tradingview/charting_library/wiki/Featuresets
			 */
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],

			// width: '200',
			// height: '200',
			// Whether to use all available space in the window
			fullscreen: this.props.fullscreen,
			// Whether to use all available space in the container
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			/**
			 * 图表样式修改
			 * https://github.com/tradingview/charting_library/wiki/Overrides
			 */
			overrides: {
				"mainSeriesProperties.showCountdown": true,
				// 图表面板背景色
				// "paneProperties.background": "#131722",
				// 图表面板网格竖线颜色
				// "paneProperties.vertGridProperties.color": "#363c4e",
				// 图表面板网格水平线颜色
				// "paneProperties.horzGridProperties.color": "#363c4e",
				// Symbol 在图标上的水印颜色，此处可隐藏
				// "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0.00)",
				// 图标面板顶部信息文字以及网格坐标数字的颜色
				// "scalesProperties.textColor" : "#AAA",
				// k线相关样式
				// "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
				// "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
			},

			// When user type the searching box (milliseconds)
			// symbol_search_request_delay: 1000,
			// auto_save_delay: 1000,

			/**
			 * 保存图表相关配置
			 * https://github.com/tradingview/charting_library/wiki/Saving-and-Loading-Charts
			 */
			charts_storage_url: this.props.chartsStorageUrl,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			// saved_data: {},
			
			// 系统自带的Theme: Light | Dark
			theme: 'Dark'
		};

		window.TradingView.onready(() => {
			const widget = window.tvWidget = new window.TradingView.widget(widgetOptions);
			widget.onChartReady(() => {
				console.log('Chart has loaded!')
			});
		});

		// test()

	}

	render() {
		return (
			<div
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}

/**
 * functionality test
****
function test() {
		// 1. resolve symbol to symbolInfo: resolveSymbol, (websocket connect)
		let symbolInfo
		const symbolName = 'Coinbase:ETH/BTC';
		const onSymbolResolvedCallback = (symbol_stub) => {
			symbolInfo = symbol_stub
		}
		Datafeed.resolveSymbol(symbolName, onSymbolResolvedCallback)

		// 2. read history data: getBars
		const resolution = '60'
		const from = ''
		const to = Date.now()
		const onHistoryCallback = (bars, obj) => {console.log(bars)}
		const onErrorCallback = () => {}
		const isFirstRequest = true
		setTimeout(() => {
			Datafeed.getBars(
				symbolInfo,
				resolution,
				from,
				to,
				onHistoryCallback,
				onErrorCallback,
				isFirstRequest
			)
		}, 1000)

		// 3. subscribe bars: update the last candle by websocket 
		const onRealtimeCallback = (bar) => {console.log(bar)}
		const subscribeUID = 123
		const onResetCacheNeededCallback = () => {}
		setTimeout(() => {
			Datafeed.subscribeBars(
				symbolInfo,
				resolution,
				onRealtimeCallback,
				subscribeUID,
				onResetCacheNeededCallback
			)
		}, 5000)
		
		// 4. unsubscribe bars
		setTimeout(() => {
			Datafeed.unsubscribeBars(
				subscribeUID
			)
		}, 20000)
}
*******/
