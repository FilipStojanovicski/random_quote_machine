var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var TweetQuote = function (_React$Component) {
    _inherits(TweetQuote, _React$Component);

    function TweetQuote(props) {
        _classCallCheck(this, TweetQuote);

        var _this = _possibleConstructorReturn(this, (TweetQuote.__proto__ || Object.getPrototypeOf(TweetQuote)).call(this, props));

        _this.constructTweetIntent = _this.constructTweetIntent.bind(_this);
        return _this;
    }

    _createClass(TweetQuote, [{
        key: 'constructTweetIntent',
        value: function constructTweetIntent() {
            var tweet_intent_url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';
            tweet_intent_url += encodeURIComponent('"' + this.props.quote.quote + '" - ' + this.props.quote.author);
            return tweet_intent_url;
        }
    }, {
        key: 'render',
        value: function render() {
            var tweet_intent_url = this.constructTweetIntent();
            return React.createElement(
                'div',
                { className: 'button tweet-quote' },
                React.createElement(
                    'a',
                    { id: 'tweet-quote', title: 'Tweet this quote', target: '_top', href: tweet_intent_url },
                    React.createElement('i', { 'class': 'fa fa-twitter' })
                )
            );
        }
    }]);

    return TweetQuote;
}(React.Component);

var QuoteGenerator = function (_React$Component2) {
    _inherits(QuoteGenerator, _React$Component2);

    function QuoteGenerator(props) {
        _classCallCheck(this, QuoteGenerator);

        var _this2 = _possibleConstructorReturn(this, (QuoteGenerator.__proto__ || Object.getPrototypeOf(QuoteGenerator)).call(this, props));

        _this2.state = { quote: "", author: "" };
        _this2.getQuote = _this2.getQuote.bind(_this2);
        return _this2;
    }

    _createClass(QuoteGenerator, [{
        key: 'getQuote',
        value: function getQuote() {
            var _this3 = this;

            $.getJSON("quotes.json").done(function (quotes) {
                var ind = Math.floor(Math.random() * quotes.length);
                var random_quote = quotes[ind];
                _this3.setState(random_quote);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { id: 'text' },
                    React.createElement('i', { 'class': 'fa fa-quote-left' }),
                    this.state.quote
                ),
                React.createElement(
                    'div',
                    { id: 'author' },
                    '- ',
                    this.state.author
                ),
                React.createElement(
                    'div',
                    { className: 'buttons' },
                    React.createElement(TweetQuote, { quote: this.state }),
                    React.createElement(
                        'button',
                        { className: 'button', id: 'new-quote', onClick: this.getQuote },
                        'New quote'
                    )
                )
            );
        }
    }]);

    return QuoteGenerator;
}(React.Component);

var domContainer = document.querySelector('#quote-box');
var quoteGen = ReactDOM.render(React.createElement(QuoteGenerator, null), domContainer);

quoteGen.getQuote();