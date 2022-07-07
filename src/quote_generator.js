const e = React.createElement;

class TweetQuote extends React.Component {

    constructor(props) {
        super(props);
        this.constructTweetIntent = this.constructTweetIntent.bind(this);
    }

    constructTweetIntent(){
        let tweet_intent_url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='
        tweet_intent_url += encodeURIComponent('"' + this.props.quote.quote + '" - ' + this.props.quote.author);
        return tweet_intent_url;
    }
    
    render() {
        let tweet_intent_url = this.constructTweetIntent();
        return (
            <div className="button tweet-quote"><a id="tweet-quote" title="Tweet this quote" target="_top" href={tweet_intent_url}><i class="fa fa-twitter"></i></a></div>
          );
    }
    }

class QuoteGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { quote: "", author: "" };
        this.getQuote = this.getQuote.bind(this);
    }
    
    getQuote(){
        $.getJSON("quotes.json")
        .done(
            (quotes) => {
            let ind = Math.floor(Math.random() * quotes.length);
            let random_quote = quotes[ind];
            this.setState(random_quote);
        });
    }
    
    render() {
        return (
            <div>
            <div id="text"><i class="fa fa-quote-left"></i>{this.state.quote}</div>
            <div id="author">- {this.state.author}</div>
            <div className="buttons">
                <TweetQuote quote={this.state}/>
                <button className="button" id="new-quote" onClick={ this.getQuote }>New quote</button>
            </div>
            </div>
          );
    }
    }
    
    let domContainer = document.querySelector('#quote-box');
    let quoteGen = ReactDOM.render(<QuoteGenerator />, domContainer);
    
    quoteGen.getQuote();


