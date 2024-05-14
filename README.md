### `npm start`

Runs the app in the development mode.

Published: https://react-movies-tv-shows-app-aleksa.netlify.app/

1. Top 10 TV Shows: The homepage displays the top 10  TV shows, allowing users to easily browse through popular options. 

2. Detailed View: Users can select any TV show from the list to view detailed information including the synopsis, cast, rating, and reviews.

3. Search Functionality: The app features a search box prominently displayed at the top. If a user types 3 or more characters and pauses for one second, the app will instantly display filtered results. If no matches are found, a message indicating the absence of results will be displayed.

4. Switching Tabs: Users can seamlessly switch between the "TV Shows" and "Movies" tabs. If the search box contains fewer than 3 characters, the top 10 results for the selected tab will be presented. If the search box contains 3 or more characters, filtered results will be displayed instantly for both tabs.

5. Pagination: If filtered results span multiple pages, pagination will be presented at the bottom. For instance, if a user is on the 3rd page of TV shows and clicks on a show to view details, upon returning (either using the browser or a dedicated "back to home" button), they will remain on the 3rd page. If user Switch tab to Movies  and return to TV shows tab without typing anything new inside serach bar they will remain on the 3rd page. If the user switches tabs and performs a new search, filtered results will be displayed with pagination reset to page 1.

6. Consistent Page Navigation: Regardless of tab switches or detailed views, the app ensures that users remain on the same page they were on previously.



