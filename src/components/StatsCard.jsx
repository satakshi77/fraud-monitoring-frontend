export default function StatsCard({title,value}){

return(

<div className="
bg-white
rounded-2xl
p-6
shadow-sm
hover:shadow-lg
hover:-translate-y-1
transition-all
duration-300
">

<p className="
text-slate-500
text-sm
font-medium
">
{title}
</p>

<h1 className="
mt-4
text-3xl
font-bold
text-slate-800
">
{value}
</h1>

</div>

)

}