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
  optTitleListSelector = '.titles';

function generateTitleLinks(){


    /* [DONE] remove contents of titleList */
    const titleList = document.querySelectorAll(optTitleListSelector);
    let html = '';

    const articles = document.querySelectorAll(optArticleSelector);
    /* for each article */



    for(let article of articles){
        /* get the article id */
        const articleId = article.getAttribute('id');

        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
   
        /* insert link into titleList */
        html = html + linkHTML;

    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }

}

generateTitleLinks();