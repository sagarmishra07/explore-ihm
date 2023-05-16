const coverImages = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
    'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
    'https://www.thirdrockadventures.com/assets-back/images/trip/mardi-himal-trek.jpggTW.jpg',
    'https://www.nepaltrekkinginfo.com/wp-content/uploads/2018/07/annapurna-mardi-himal-trek.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbeqNpuP2zfV5-FJ8seBi0L2npZ316PeD2GQ&usqp=CAU',
];

const blogNames = ['N blog', 'b blog', '2 blog', '3 blog'];

const blogMock = (size: number) => {
    const mockData = Array.from(Array(size).keys()).map(() => {
        return {
            id: Math.floor(Math.random() * (500 - 1 + 1) + 1),
            // blog_title: coverImages[Math.floor(Math.random() * (coverImages.length - 1 - 1 + 1) + 1)],
            // profileImg:
            //     profileImages[Math.floor(Math.random() * (profileImages.length - 1 - 1 + 1) + 1)],
            blog_title: blogNames[Math.floor(Math.random() * (blogNames.length - 1 - 1 + 1) + 1)],
            blog_cover_image:
                coverImages[Math.floor(Math.random() * (coverImages.length - 1 - 1 + 1) + 1)],
            blog_description: 'blog description from mock data',
            created_at: Date(),
        };
    });
    return mockData;
};



export default blogMock;

// Math.floor(Math.random() * (max - min + 1) + min);
