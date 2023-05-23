import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
  const { searchTerm, searchValue, setIsLoading, setSearchResults } = props;
  return (
    <span className="content">
        <a href="#" onClick={async (event) => {
            event.preventDefault();
            setIsLoading(true);
            try {
                const result = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
                setSearchResults(result);
            } catch(error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }}>{searchValue}</a>
    </span>
  )
}

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
const Feature = (props) => {
    const { featuredResult, setSearchResults, setIsLoading } = props;
    // const { images } = featuredResult; 
    return (
        featuredResult ?
        (<main id="feature">
            <div className="object-feature">
                <header>
                    <h3>{ featuredResult.title }</h3>
                    <h4>{ featuredResult.dated }</h4>
                </header>
                <section className="facts">

                    {
                        featuredResult.description
                        ? <React.Fragment>
                            <span className="title">Description</span>
                            <span className="content">{ featuredResult.description }</span>
                          </React.Fragment>
                        : null
                    }

                    {
                        featuredResult.culture
                        ? <React.Fragment>
                            <span className="title">Culture</span>
                            <Searchable searchTerm={ "culture" } searchValue={ featuredResult.culture } setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
                          </React.Fragment>
                        : null
                    }

                    {
                        featuredResult.style
                        ? <React.Fragment>
                            <span className="title">Style</span>
                            <span className="content">{ featuredResult.style }</span>
                          </React.Fragment>
                        : null
                    }

                    {
                        featuredResult.technique
                        ? <React.Fragment>
                            <span className="title">Technique</span>
                            <Searchable searchTerm={ "technique" } searchValue={ featuredResult.technique } setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
                          </React.Fragment>
                        : null
                    }

                    {
                        featuredResult.medium
                        ? <React.Fragment>
                            <span className="title">Medium</span>
                            <Searchable searchTerm={ "medium" } searchValue={ featuredResult.medium.toLowerCase() } setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
                          </React.Fragment>
                        : null
                    }

                    {
                        featuredResult.dimensions
                        ? <React.Fragment>
                            <span className="title">Dimensions</span>
                            <span className="content">{ featuredResult.dimensions }</span>
                          </React.Fragment>
                        : null
                    }

                    {
                        featuredResult.people
                        ? featuredResult.people.map((person) => 
                          <React.Fragment>
                            <span className="title">Person</span>
                            <Searchable searchTerm={ "person" } searchValue={ person.displayname } setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
                          </React.Fragment>)
                        : null
                    }

                    {
                        featuredResult.department
                        ? <React.Fragment>
                            <span className="title">Department</span>
                            <span className="content">{ featuredResult.department }</span>
                          </React.Fragment>
                        : null
                    }

                    {
                        featuredResult.division
                        ? <React.Fragment>
                            <span className="title">Division</span>
                            <span className="content">{ featuredResult.division }</span>
                          </React.Fragment>
                        : null
                    }

                    {
                        featuredResult.contact
                        ? <React.Fragment>
                            <span className="title">Contact</span>
                            <span className="content">{ featuredResult.contact }</span>
                          </React.Fragment>
                        : null
                    }

                    {
                        featuredResult.creditline
                        ? <React.Fragment>
                            <span className="title">Credit</span>
                            <span className="content">{ featuredResult.creditline }</span>
                          </React.Fragment>
                        : null
                    }

                </section>

                <section className="photos">
                    {
                    featuredResult.images.length > 0
                    ? featuredResult.images.map((image) => 
                        <img src={ image.baseimageurl } alt={ featuredResult.title } />)
                    : null
                    }

                </section>
            </div>
        </main>) :
        (<main id="feature"></main>)
    )
}

export default Feature;