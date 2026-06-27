// by Stenly
"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function NHentaiGalleryPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/nhentai/watch?id=${id}`);
        const result = await res.json();
        if (result.status) {
          setData(result.result);
        } else {
          setError(result.message || "Failed to fetch gallery details");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1f1f1f] text-white flex items-center justify-center font-sans tracking-wide">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#ed2553] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold uppercase tracking-[0.2em]">LOADING_GALLERY_DATA</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1f1f1f] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="text-[#ed2553] text-4xl mb-4 font-black tracking-tighter">ERROR_404</div>
        <p className="text-slate-400 font-mono text-xs max-w-md uppercase tracking-widest">{error}</p>
        <Link href="/docsv2/nhentai" className="mt-8 px-6 py-2 bg-[#ed2553] text-white rounded font-bold text-xs uppercase tracking-widest hover:bg-[#f15478] transition-colors">
          Back to Node
        </Link>
      </div>
    );
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #1f1f1f;
            color: #ccc;
            font-family: "Noto Sans", sans-serif;
            margin: 0;
            padding: 0;
        }
        nav {
            background-color: #ed2553;
            height: 50px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        .logo img {
            height: 30px;
        }
        .search {
            flex: 1;
            max-width: 400px;
            margin: 0 20px;
            display: flex;
        }
        .search input {
            width: 100%;
            background-color: #363636 !important;
            color: #fff !important;
            border: none;
            padding: 5px 15px;
            border-radius: 5px 0 0 5px;
            outline: none;
            height: 35px;
            font-size: 14px;
        }
        .search button {
            background-color: #4d4d4d;
            border: none;
            color: #fff;
            padding: 0 15px;
            border-radius: 0 5px 5px 0;
            cursor: pointer;
            height: 35px;
        }
        nav .menu {
            display: flex;
            list-style: none;
            gap: 20px;
            margin: 0;
            padding: 0;
            align-items: center;
        }
        nav .menu li a {
            color: #fff;
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
        }
        .container {
            max-width: 1200px;
            margin: 20px auto;
            background-color: #1a1a1a;
            padding: 20px;
            border-radius: 5px;
        }
        #bigcontainer {
            display: flex;
            gap: 30px;
            flex-direction: row;
        }
        #cover {
            width: 350px;
            flex-shrink: 0;
        }
        #cover img {
            width: 100%;
            height: auto;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        #info-block {
            flex: 1;
        }
        #info h1 {
            font-size: 24px;
            color: #fff;
            margin: 0 0 5px 0;
            font-weight: 700;
        }
        #info h2 {
            font-size: 18px;
            color: #888;
            margin: 0 0 15px 0;
            font-weight: 400;
        }
        #gallery_id {
            font-size: 14px;
            color: #fff;
            margin-bottom: 20px;
        }
        #gallery_id .hash {
            color: #888;
        }
        .tag-container {
            margin-bottom: 15px;
            font-size: 14px;
            color: #888;
        }
        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 5px;
        }
        .tag {
            background-color: #2b2b2b;
            color: #fff;
            text-decoration: none;
            padding: 2px 10px;
            border-radius: 3px;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: background 0.2s;
        }
        .tag:hover {
            background-color: #444;
        }
        .tag .count {
            color: #888;
            font-size: 11px;
        }
        .buttons {
            display: flex;
            gap: 10px;
            margin-top: 30px;
        }
        .btn {
            padding: 10px 20px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            font-weight: 700;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: #fff;
            text-decoration: none;
        }
        .btn-primary { background-color: #ed2553; }
        .btn-secondary { background-color: #333; }
        .btn-disabled { opacity: 0.5; cursor: not-allowed; }
        
        #thumbnail-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 15px;
            margin-top: 40px;
        }
        .thumb-container {
            background-color: #2b2b2b;
            border-radius: 5px;
            overflow: hidden;
            transition: transform 0.2s;
        }
        .thumb-container:hover {
            transform: scale(1.05);
        }
        .thumb-container img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        @media (max-width: 768px) {
            #bigcontainer { flex-direction: column; align-items: center; }
            #cover { width: 100%; max-width: 300px; }
            #info { text-align: center; }
            .tags { justify-content: center; }
            .buttons { justify-content: center; flex-wrap: wrap; }
        }
      ` }} />

      <nav role="navigation">
        <Link className="logo" href="/docsv2/nhentai">
          <img src="/img/logo.svg" alt="logo" width="46" height="30" />
        </Link>
        <form role="search" className="search">
          <input type="search" name="q" placeholder="Search..." required />
          <button type="submit"><i className="fa fa-search"></i></button>
        </form>
        <ul className="menu">
          <li><Link href="/docsv2/nhentai">Random</Link></li>
          <li><Link href="/docsv2/nhentai">Tags</Link></li>
          <li className="menu-register"><Link href="/docsv2/nhentai" style={{ backgroundColor: '#ed2553', padding: '5px 15px', borderRadius: '4px' }}>Sign in</Link></li>
        </ul>
      </nav>

      <div id="content">
        <div className="container" id="bigcontainer">
          <div id="cover">
            <a href="#">
              <img src={data.cover} alt={data.title?.english} />
            </a>
          </div>

          <div id="info-block">
            <div id="info">
              <h1>{data.title?.english}</h1>
              <h2>{data.title?.japanese}</h2>
              <h3 id="gallery_id"><span className="hash">#</span>{data.id}</h3>
              
              <section id="tags">
                {Object.entries(data.tags_info).map(([key, tags]: [string, any]) => (
                  tags && tags.length > 0 && (
                    <div key={key} className="tag-container field-name">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <span className="tags">
                        {tags.map((tag: any, idx: number) => (
                          <a key={idx} href="#" className="tag">
                            <span className="name">{tag.name}</span>
                            <span className="count">{tag.count}</span>
                          </a>
                        ))}
                      </span>
                    </div>
                  )
                ))}

                <div className="tag-container field-name">
                  Pages:
                  <span className="tags">
                    <a href="#" className="tag">
                      <span className="name">{data.pages_count}</span>
                    </a>
                  </span>
                </div>
                <div className="tag-container field-name">
                  Uploaded:
                  <span className="tags">
                    <time dateTime={data.uploaded?.datetime}>{data.uploaded?.text}</time>
                  </span>
                </div>
              </section>

              <div className="buttons">
                <button type="button" className="btn" style={{ background: '#2e7d32', borderRadius: '4px 0 0 4px', marginRight: 0 }}>
                  <i className="fa fa-thumbs-up"></i> {data.stats?.likes}
                </button>
                <button type="button" className="btn" style={{ background: '#c62828', borderRadius: '0 4px 4px 0', marginLeft: -1 }}>
                  <i className="fa fa-thumbs-down"></i> {data.stats?.dislikes}
                </button>
                <button className="btn btn-secondary btn-disabled">
                  <i className="fa fa-heart"></i> Favorite ({data.stats?.favorites})
                </button>
                <button className="btn btn-secondary btn-disabled">
                  <i className="fa fa-download"></i> Download
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container" id="thumbnail-container">
          {data.thumbnails?.map((thumb: any, idx: number) => (
            <div key={idx} className="thumb-container">
              <a className="gallerythumb" href="#" rel="nofollow">
                <img 
                  width={thumb.width} 
                  height={thumb.height} 
                  src={thumb.thumbnail} 
                  alt={thumb.alt} 
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ textAlign: 'center', backgroundColor: 'transparent', color: '#888', fontSize: '12px' }}>
        <p>DMCA | Nhentai Node | by Stenly</p>
      </div>
    </>
  );
}
