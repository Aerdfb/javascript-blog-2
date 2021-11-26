'use strict';


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

}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){


    /* [DONE] remove contents of titleList */
    const titleList = document.querySelectorAll(optTitleListSelector);
    let html = '';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    /* [DONE] for each article */



    for(let article of articles){
        /* [DONE] get the article id */
        const articleId = article.getAttribute('id');

        /* [DONE] find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(optArticleSelector);

        /* [DONE] create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
   
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

function generateTags(){
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* [IN PROGRESS] START LOOP: for every article: */
    for(let article of articles){
      /* [DONE] find tags wrapper */
        const tagWrapper = article.querySelector(optArticleTagsSelector);
      /* [DONE] make html variable with empty string */
        let html = '';
      /* [DONE] get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
      /* [DONE] split tags into array */
        const articleTagsArray = articleTags.split(' ');
      /* [IN PROGRESS] START LOOP: for each tag */
        for(let tag of articleTagsArray){
        /* [DONE] generate HTML of the link */
            const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        /* [DONE] add generated code to html variable */
            html = html + tagHTML;
      /* [DONE] END LOOP: for each tag */
        }
      /* [DONE] insert HTML of all the links into the tags wrapper */
       tagWrapper.innerHTML = html;

    /* [DONE] END LOOP: for every article: */
    }
}
  
  generateTags();

  function tagClickHandler(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    // console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTag = document.querySelectorAll('a.active[href^="#tag-"]')
    console.log(activeTag);
    /* START LOOP: for each active tag link */
    for(let tag of activeTag){
      /* remove class active */
        tag.classList.remove('.active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tag of tagLinks){
      /* add class active */
        tag.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    console.log(optArticleSelector);
  }
  function addClickListenersToTags(){
    /* find all links to tags */
    const linksTag = document.querySelectorAll('a[href^="#tag-"]');
    console.log(linksTag);
    /* START LOOP: for each link */
    for(let link of linksTag){
      /* add tagClickHandler as event listener for that link */
        link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();