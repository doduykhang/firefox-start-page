/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"suSTw9bR29fc3DTq","label":"reddit","bookmarks":[{"id":"cA4czE4jNfe8Kgku","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"tOyV8XE8sMbJFUe3","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"V8KWjYhhFiD3bLV7","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"taf646YP5yyGGcmQ","label":"design tools","bookmarks":[{"id":"Z4zmOY3hxlt62efb","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"qYc5MUTQ5pfx3a7A","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"nUrSLPoTaIURjgI0","label":"haikei","url":"https://app.haikei.app/"},{"id":"r8CrvOrt2uJMJDvo","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"So0cOsYNDgV19fqF","label":"worth reading","bookmarks":[{"id":"btOneHLWluvlRTAr","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"LHmS8E6MBWP0xwAA","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"jhntYlQgF2cgMigo","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"IYOcT10pOZv1afm9","label":"sources","bookmarks":[{"id":"UCRcJXuvs3ItRgkp","label":"icons","url":"https://feathericons.com/"},{"id":"hbTQ5mbyhqHNpCJ3","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"6l5FOdEfcGfajcEL","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"9pL72VXjtOGFIzbp","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
