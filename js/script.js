'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloundLink: Handlebars.compile(document.querySelector('#template-authors-cloud-link').innerHTML)
};


const titleClickHandler = function(event){

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
    
  event.preventDefault();
  const clickedElement = this;
  clickedElement.classList.add('active');
 
  /* [DONE] remove class 'active' from all articles */
    

  const activeArticles = document.querySelectorAll('.posts .post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const hrefLink = clickedElement.getAttribute('href');
 
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const currentArticle = document.querySelector(hrefLink);

  /* [DONE] add class 'active' to the correct article */

  currentArticle.classList.add('active');

};

const opts = {
  ArticleSelector: '.post',
  TitleSelector: '.post-title',
  TitleListSelector: '.titles',
  ArticleTagsSelector: '.post-tags .list',
  ArticleAuthorSelector: '.post-author',
  TagsListSelector: '.tags.list',
  CloudClassCount: '5',
  CloudClassPrefix: 'tag-size-',
  AuthorListSelector: '.list.authors'
};

function generateTitleLinks(customSelector = ''){


  /* [DONE] remove contents of titleList */
  const titleList = document.querySelectorAll(opts.TitleListSelector);
  let html = '';

  const articles = document.querySelectorAll(opts.ArticleSelector + customSelector);
  /* [DONE] for each article */



  for(let article of articles){
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    const articleTitle = article.querySelector(opts.TitleSelector).innerHTML;
    // console.log(optArticleSelector);

    /* [DONE] create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
   
    /* [DONE] insert link into titleList */
    html = html + linkHTML;

  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}
generateTitleLinks();

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999
  };
  // console.log(params);
  for(let tag in tags){

    if(tags[tag] > params.max){
      params.max = tags[tag];
    } else if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    // console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}
function calculateTagClass(count, params){

  const classNumber = Math.floor((count - params.min) / (params.max - params.min) * (opts.CloudClassCount - 1) + 1);

  return opts.CloudClassPrefix + classNumber;
}

function generateTags(){
  /* [DONE] create a new variable allTags with an empty object */
  let allTags = {};
  /* [DONE] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  // console.log(tagList);
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.ArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find tags wrapper */
    const tagWrapper = article.querySelector(opts.ArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* [DONE] generate HTML of the link */
      const tagHTMLData = {id: tag, title: tag};
      const tagHTML = templates.tagLink(tagHTMLData);
      /* [DONE] add generated code to html variable */
      html = html + tagHTML;
      /* [DONE] check if this link is NOT already in allTags */
      if(!allTags[tag]){
      /* [DONE] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* [DONE] END LOOP: for each tag */
    }
    // console.log(html);
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    /* [DONE] END LOOP: for every article: */
  }
  /* [DONE] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams:', tagsParams)
  const allTagsData = {tags: []};

  /* [DONE] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [DONE] generate code of a link and add it to allTagsHTML */
    // const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
    // console.log('tagLinkHTML:', tagLinkHTML);
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [DONE] END LOOP: for each tag in allTags: */

  /*[DONE] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  // console.log(tagList);
}

generateTags();

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    /* [DONE] remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* [DONE] add class active */
    tagLink.classList.add('active');
    /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  // console.log(opts.ArticleSelector);
}
function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const linksTag = document.querySelectorAll('a[href^="#tag-"]');
  // console.log(linksTag);
  /* START LOOP: for each link */
  for(let link of linksTag){
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
  
addClickListenersToTags();

function generateAuthors(){
  /* [DONE] create a new variable allAuthors with empty object */
  let allAuthors = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.ArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find authors wrapper */
    const authorWrapper = article.querySelector(opts.ArticleAuthorSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-author attribute */
    const author = article.getAttribute('data-author');
    /* [DONE] generate HTML of the link */
    const authorHTMLData = { id: author, title: author};
    const authorLink = templates.authorLink(authorHTMLData);
    /* [DONE] add generated HTML */
    html = html + authorLink;
    /* [DONE] add counter of Allauthors */
    if(!allAuthors[author]){
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    
    /* [DONE] insert HTML of links into tags wrapper */
    authorWrapper.innerHTML = html;
    /* [DONE] find authors list in rightbar */
    const authorList = document.querySelector(opts.AuthorListSelector);
    /* [DONE] insert links to right bar authors */
    let allAuthorsData = {authors: []};

    for(let author in allAuthors){
      // allAuthorsHTML += '<li><a href="#author-' + author + '"><span>' + author + ' </span></a></li>';
      allAuthorsData.authors.push({
        author: author
      });
    }

    authorList.innerHTML = templates.authorCloundLink(allAuthorsData);
  }
  /* [DONE] END LOOP: for every article: */
    
}
generateAuthors();

  
function authorClickHandler(event){
  /* [DONE] prevent default action of this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tags" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  /* [DONE] find all tag links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* [DONE] START LOOP: for each active tag link */
  for(let authorLink of authorLinks){
    /* [DONE] remove class active */
    authorLink.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const authorLinksHrefs = document.querySelectorAll('[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */
  for(let authorLinkHref of authorLinksHrefs){
    /* [DONE] add class active */
    authorLinkHref.classList.add('active');
    /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
}  
function addClickListenersToAuthors(){
  /* [DONE] find all links to tags */
  const authorsLinks = document.querySelectorAll('a[href^="#author-"]');
  /* [DONE] START LOOP: for each link */
  for(let authorLink of authorsLinks){
    /* [DONE] add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToAuthors();