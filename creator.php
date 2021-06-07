<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8">

    <title>ORBITALS - Creator</title>
    <meta name="description" content="aaa">
    <meta name="author" content="bbb">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="css/styles2.css">
    <script src="js/renderer.js"></script>
    <script src="js/figure_creator.js"></script>
  </head>

  <body>
    <div class="content">
        <header><a href="index.php">ORBITALS</a></header>
        <nav>
          Create a new shape:
          <ul>Edge count: <input type="number" id="edge_count_html" min="2" max="16"></input></ul>
          <ul>Color: <input type="color" id="color_html"></input></ul>
          <ul><input type="button" onclick="addDescriptorCallback()" value="Add Descriptor"></ul>
          <form id='shape_form_html' onsubmit="validateForm()" method="post" class="form-vertical" action='creator.php'>
            <ul>Figure Title: <input type="text" name="title_html" id="title_html"></input></ul>
            <ul>Descriptors:</ul>
            <table id="descriptor_table">
            </table>
            <ul>------------------------</ul>
            <ul><input type="submit" value="Submit"></ul>
          </form>
        </nav>
        <article>
          <canvas canvas id="figure_renderer" width="600" height="600"></canvas>
        </article>
    </div>
    <footer class="footer">
      
    </footer>
  </body>
  <?php include 'send_figure.php'; ?>
</html>