// import ReactMarkdown from 'react-markdown'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {BLOCKS, INLINES} from '@contentful/rich-text-types';
// import ReactDom from 'react-dom'
// import Carousel from 'react-bootstrap/Carousel';

const RichTextOpt = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <div className='richText'>{children}</div>
    }
  }
}
const Parts = ({ content }) => {

  console.log("content", content)
  const imgarr = content.images.slice(1, content.images.length);
  console.log('imgarr.....', imgarr)
  return (
    <div className='parts'>
      <div className='img_div'
      >
        <h1>{content.name}</h1>
        <div className='images'>
        {
        imgarr.map(item => 
          <img src={item.url} />
          )
        }

        </div>
      </div>  
      {documentToReactComponents(content.overview, RichTextOpt)}    
    </div>
  );
};

export default Parts;

