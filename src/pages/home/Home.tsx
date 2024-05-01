import KanbanBoard from '/kanban.svg';
import KanbanBoardDark from '/kanban-dark-mode.svg';

const Home = () => {
   return (
      <div className="h-full w-full grid place-content-center">
         <img src={KanbanBoard} alt="kanban board" className="w-auto h-40 mx-auto dark:hidden" />
         <img src={KanbanBoardDark} alt="kanban board" className="w-auto h-40 hidden mx-auto dark:block" />
         <h3 className="font-extrabold text-4xl">Kanban Board</h3>
      </div>
   );
};

export default Home;
