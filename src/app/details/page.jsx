import PlainLayout from "@/components/master/PlainLayout";
import PopularList from "@/components/news/PopularList";
import NewsDetails from "@/components/news/NewsDetails";
import CommentsList from "@/components/news/CommentsList";

async function getData(id) {
    let Details = (await (await fetch(`${process.env.HOST}/api/news/details?id=${id}`)).json())['data']
    let Popular = (await (await fetch(`${process.env.HOST}/api/news/type?type=Popular`)).json())['data']
    let Comments= (await (await fetch(`${process.env.HOST}/api/comments/news?postId=${id}`,{ cache: 'no-store' })).json())['data']

    return {Popular:Popular, Details:Details, Comments:Comments}
}


const Page = async (props) => {

    let id=props.searchParams['id']
    let data= await getData(id)

  return (
       <PlainLayout>
           <div className="container mt-2">
               <div className="row">
                   <div className="col-md-9  col-lg-9 col-sm-12 col-12 px-3">
                        <div className="card">                         
                            <NewsDetails details={data['Details']}/> 
                            <CommentsList postId={id} data={data['Comments']}/>
                        </div>
                   </div>
                   <div className="col-md-3 col-lg-3 col-sm-12 col-12 px-3">
                       <PopularList popular={data['Popular']}/>                      
                   </div>
               </div>
           </div>
       </PlainLayout>
  )
}
export default Page;