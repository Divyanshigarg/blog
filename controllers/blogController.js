const Blog = require('../models/blogModel')
const {response} = require('../helper/response')

//function to create blog
exports.createBlog = async(req,res, next) => {
    try{
        const user = req.user.userId;
        const { title, content , category} = req.body;
        //check whether all the fields are provided or not
        if(!title)
        return response(res, 400, false, 'Title is required',{})
        if(!content)
        return response(res, 400, false, 'Content is required',{})
        if(!category || !['Technology', 'Health', 'Lifestyle', 'Education', 'Travel'].includes(category))
        return response(res, 400, false, 'Category is required and should be one of these Technology, Health, Lifestyle, Education, Travel',{})

        //create blog
        const createBlog = await Blog.create({
            title,
            content,
            author: user,
            category
        })
        return response(res, 200, true, 'Blog created successfully', {
            createBlog
        })

    }catch(error){
       next(error)
    }
}

//function to update blog
exports.updateBlog = async (req, res, next) => {
    try {
        const userId = req.user.userId; 
        const { blogId } = req.params;
        const { title, content, published } = req.body;

        // Check if blogId is provided
        if (!blogId) {
            return response(res, 400, false, "Blog ID is required", {});
        }

        // Find the existing blog
        const existingBlog = await Blog.findById(blogId);
        if (!existingBlog) {
            return response(res, 404, false, "Blog not found", {});
        }

        // Check if the logged-in user is the author of the blog
        if (existingBlog.author.toString() !== userId) {
            return response(res, 403, false, "Unauthorized: You can only update your own blogs", {});
        }

        // Update blog fields if provided
        existingBlog.title = title || existingBlog.title;
        existingBlog.content = content || existingBlog.content;
        existingBlog.published = published ?? existingBlog.published;

        // Save updated blog
        await existingBlog.save();

        return response(res, 200, true, "Blog updated successfully", { updatedBlog: existingBlog });

    } catch (error) {
        next(error)
    }
};

//function to delete blog
exports.deleteBlog = async (req, res, next) => {
    try {
        const userId = req.user.userId; 
        const { blogId } = req.params;

        // Check if blogId is provided
        if (!blogId) {
            return response(res, 400, false, "Blog ID is required", {});
        }

        // Find the existing blog
        const existingBlog = await Blog.findOne({ _id: blogId, isDeleted: false });
        if (!existingBlog) {
            return response(res, 404, false, "Blog not found", {});
        }

        // Check if the logged-in user is the author of the blog
        if (existingBlog.author.toString() !== userId) {
            return response(res, 403, false, "Unauthorized: You can only delete your own blogs", {});
        }

        // Delete the blog
        const deletedBlog = await Blog.findOneAndUpdate({_id:blogId},{ isDeleted: true }, {new:true});

        return response(res, 200, true, "Blog deleted successfully", {deletedBlog});

    } catch (error) {
        next(error)
    }
};

//function to get the single blog details
exports.getBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params;

        // Check if blogId is provided
        if (!blogId) {
            return response(res, 400, false, "Blog ID is required", {});
        }

        // Find the blog by ID
        const blog = await Blog.findOne({ _id: blogId, isDeleted: false });
        if (!blog) {
            return response(res, 404, false, "Blog not found", {});
        }

        return response(res, 200, true, "Blog fetched successfully", { blog });

    } catch (error) {
        next(error)
    }
};

//function to get all the blogs
exports.getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({isDeleted:false});

        // Check if blogs exist
        if (!blogs.length) {
            return response(res, 404, false, "No blogs found", {});
        }

        return response(res, 200, true, "Blogs fetched successfully", { blogs });

    } catch (error) {
       next(error)
    }
};
