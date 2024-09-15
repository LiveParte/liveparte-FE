// pages/posts.js
export default function Posts({ posts }) {
    
    return (
      <div className="text-white">
        <h1>Posts from JSONPlaceholder</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  // Fetch data on the server-side
  export async function getServerSideProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const resII = await fetch('https://jsonplaceholder.typicode.com/posts');

    const posts = await res.json();
  
    return {
      props: { posts }, // Pass the data as props to the page
    };
  }
  